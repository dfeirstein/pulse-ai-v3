/**
 * Pulse AI Dynamic Pricing Calculator
 * Calculates monthly pricing based on workspace metrics and configuration
 */

export interface WorkspaceMetrics {
  totalUsers: number;
  activeUsers: number;
  publicChannels: number;
  privateChannels: number;
  monthlyMessageVolume: number;
  dailyActiveUsers: number;
  workspaceName: string;
  industry?: string;
  countryCode?: string;
}

export interface PricingConfiguration {
  trackedUsers: number;
  trackedChannels: number;
  messagesampling: number; // 1-10 (analyze every Nth message)
  businessHoursOnly: boolean;
  excludeWeekends: boolean;
  excludeBots: boolean;
  refreshRate: 'realtime' | 'daily' | 'weekly' | 'manual';
}

export interface OptimizationSuggestion {
  action: string;
  impact: number; // Dollar amount saved
  description: string;
  easyToImplement: boolean;
}

export interface PricingResult {
  tier: 'starter' | 'growth' | 'scale' | 'enterprise';
  baseFee: number;
  usersFee: number;
  channelsFee: number;
  messageVolumeFee: number;
  totalMonthly: number;
  totalAnnual: number;
  annualDiscount: number;
  effectivePerUserCost: number;
  optimizationSuggestions: OptimizationSuggestion[];
  breakdown: {
    includedUsers: number;
    additionalUsers: number;
    includedChannels: number;
    additionalChannels: number;
    includedMessages: number;
    additionalMessages: number;
  };
}

// Pricing tiers configuration
const PRICING_TIERS = {
  starter: {
    baseFee: 49,
    includedUsers: 15,
    includedChannels: 5,
    includedMessages: 10000,
    refreshRate: 'weekly'
  },
  growth: {
    baseFee: 149,
    includedUsers: 50,
    includedChannels: 20,
    includedMessages: 50000,
    refreshRate: 'daily'
  },
  scale: {
    baseFee: 399,
    includedUsers: 200,
    includedChannels: 50,
    includedMessages: 200000,
    refreshRate: 'realtime'
  },
  enterprise: {
    baseFee: 0, // Custom pricing
    includedUsers: Infinity,
    includedChannels: Infinity,
    includedMessages: Infinity,
    refreshRate: 'realtime'
  }
};

// Overage rates
const OVERAGE_RATES = {
  users: [
    { min: 0, max: 50, rate: 4 },
    { min: 51, max: 200, rate: 3 },
    { min: 201, max: 500, rate: 2.5 },
    { min: 501, max: Infinity, rate: 2 }
  ],
  channels: {
    standard: 8,
    highVolume: 15, // >5000 messages/month
    archive: 5
  },
  messages: [
    { min: 0, max: 10000, fee: 0 },
    { min: 10001, max: 50000, fee: 40 },
    { min: 50001, max: 200000, fee: 120 },
    { min: 200001, max: 500000, fee: 250 },
    { min: 500001, max: 1000000, fee: 400 },
    { min: 1000001, max: Infinity, fee: 0 } // Enterprise
  ]
};

/**
 * Determine the appropriate tier based on workspace metrics
 */
export function determineTier(metrics: WorkspaceMetrics): keyof typeof PRICING_TIERS {
  const { activeUsers, publicChannels, monthlyMessageVolume } = metrics;

  if (activeUsers > 200 || publicChannels > 50 || monthlyMessageVolume > 200000) {
    if (activeUsers > 500 || publicChannels > 100 || monthlyMessageVolume > 1000000) {
      return 'enterprise';
    }
    return 'scale';
  }

  if (activeUsers > 50 || publicChannels > 20 || monthlyMessageVolume > 50000) {
    return 'growth';
  }

  if (activeUsers > 15 || publicChannels > 5 || monthlyMessageVolume > 10000) {
    return 'growth'; // Recommend growth for better value
  }

  return 'starter';
}

/**
 * Calculate user-based fees
 */
function calculateUsersFee(
  users: number,
  tier: keyof typeof PRICING_TIERS
): { fee: number; additionalUsers: number } {
  const tierConfig = PRICING_TIERS[tier];
  
  if (tier === 'enterprise') {
    return { fee: 0, additionalUsers: 0 };
  }

  const additionalUsers = Math.max(0, users - tierConfig.includedUsers);
  
  if (additionalUsers === 0) {
    return { fee: 0, additionalUsers: 0 };
  }

  // Find the appropriate rate based on total users
  const rate = OVERAGE_RATES.users.find(
    r => users >= r.min && users <= r.max
  )?.rate || 2;

  return {
    fee: additionalUsers * rate,
    additionalUsers
  };
}

/**
 * Calculate channel-based fees
 */
function calculateChannelsFee(
  channels: number,
  tier: keyof typeof PRICING_TIERS,
  messageVolume: number
): { fee: number; additionalChannels: number } {
  const tierConfig = PRICING_TIERS[tier];
  
  if (tier === 'enterprise') {
    return { fee: 0, additionalChannels: 0 };
  }

  const additionalChannels = Math.max(0, channels - tierConfig.includedChannels);
  
  if (additionalChannels === 0) {
    return { fee: 0, additionalChannels: 0 };
  }

  // Determine if channels are high volume
  const avgMessagesPerChannel = messageVolume / channels;
  const rate = avgMessagesPerChannel > 5000 
    ? OVERAGE_RATES.channels.highVolume 
    : OVERAGE_RATES.channels.standard;

  return {
    fee: additionalChannels * rate,
    additionalChannels
  };
}

/**
 * Calculate message volume fees
 */
function calculateMessageVolumeFee(
  volume: number,
  tier: keyof typeof PRICING_TIERS
): { fee: number; additionalMessages: number } {
  const tierConfig = PRICING_TIERS[tier];
  
  if (tier === 'enterprise') {
    return { fee: 0, additionalMessages: 0 };
  }

  const additionalMessages = Math.max(0, volume - tierConfig.includedMessages);
  
  if (additionalMessages === 0) {
    return { fee: 0, additionalMessages: 0 };
  }

  // Find the appropriate fee tier
  const messageTier = OVERAGE_RATES.messages.find(
    t => volume >= t.min && volume <= t.max
  );

  return {
    fee: messageTier?.fee || 0,
    additionalMessages
  };
}

/**
 * Apply configuration adjustments to metrics
 */
export function applyConfigurationAdjustments(
  metrics: WorkspaceMetrics,
  config: PricingConfiguration
): WorkspaceMetrics {
  const adjustedMetrics = { ...metrics };

  // Apply user tracking limit
  adjustedMetrics.activeUsers = Math.min(config.trackedUsers, metrics.activeUsers);

  // Apply channel tracking limit  
  adjustedMetrics.publicChannels = Math.min(config.trackedChannels, metrics.publicChannels);

  // Apply message sampling
  if (config.messagesampling > 1) {
    adjustedMetrics.monthlyMessageVolume = Math.floor(
      metrics.monthlyMessageVolume / config.messagesampling
    );
  }

  // Apply time-based filters
  if (config.businessHoursOnly) {
    // Assume 40% of messages during business hours
    adjustedMetrics.monthlyMessageVolume *= 0.4;
  }

  if (config.excludeWeekends) {
    // Assume 71% of messages on weekdays (5/7 days)
    adjustedMetrics.monthlyMessageVolume *= 0.71;
  }

  if (config.excludeBots) {
    // Assume 20% of messages are from bots
    adjustedMetrics.monthlyMessageVolume *= 0.8;
  }

  return adjustedMetrics;
}

/**
 * Generate optimization suggestions
 */
function generateOptimizationSuggestions(
  metrics: WorkspaceMetrics,
  config: PricingConfiguration,
  currentPrice: number
): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];

  // Suggest reducing tracked channels if many are low-activity
  if (metrics.publicChannels > 20 && config.trackedChannels > 20) {
    const reducedChannelPrice = calculatePricingWithoutOptimizations(metrics, {
      ...config,
      trackedChannels: 20
    });
    
    if (reducedChannelPrice < currentPrice) {
      suggestions.push({
        action: 'Track only top 20 most active channels',
        impact: currentPrice - reducedChannelPrice,
        description: 'Focus on channels with highest engagement',
        easyToImplement: true
      });
    }
  }

  // Suggest message sampling if volume is high
  if (metrics.monthlyMessageVolume > 100000 && config.messagesampling === 1) {
    const sampledPrice = calculatePricingWithoutOptimizations(metrics, {
      ...config,
      messagesampling: 2
    });
    
    suggestions.push({
      action: 'Enable 2x message sampling',
      impact: currentPrice - sampledPrice,
      description: 'Analyze every 2nd message for statistically valid insights',
      easyToImplement: true
    });
  }

  // Suggest business hours only if not already enabled
  if (!config.businessHoursOnly) {
    const businessHoursPrice = calculatePricingWithoutOptimizations(metrics, {
      ...config,
      businessHoursOnly: true
    });
    
    suggestions.push({
      action: 'Track business hours only',
      impact: currentPrice - businessHoursPrice,
      description: 'Focus on 9-5 Monday-Friday activity',
      easyToImplement: true
    });
  }

  // Suggest excluding bots
  if (!config.excludeBots) {
    const noBotPrice = calculatePricingWithoutOptimizations(metrics, {
      ...config,
      excludeBots: true
    });
    
    suggestions.push({
      action: 'Exclude bot messages',
      impact: currentPrice - noBotPrice,
      description: 'Filter out automated messages and integrations',
      easyToImplement: true
    });
  }

  // Suggest annual billing
  const annualSavings = currentPrice * 12 * 0.2; // 20% discount
  suggestions.push({
    action: 'Switch to annual billing',
    impact: annualSavings / 12,
    description: 'Save 20% with annual commitment (2.4 months free)',
    easyToImplement: true
  });

  return suggestions.sort((a, b) => b.impact - a.impact);
}

/**
 * Internal pricing calculation without optimization suggestions
 */
function calculatePricingWithoutOptimizations(
  metrics: WorkspaceMetrics,
  config: PricingConfiguration
): number {
  // Apply configuration adjustments
  const adjustedMetrics = applyConfigurationAdjustments(metrics, config);
  
  // Determine tier
  const tier = determineTier(adjustedMetrics);
  
  if (tier === 'enterprise') {
    return 0; // Custom pricing
  }

  const tierConfig = PRICING_TIERS[tier];
  
  // Calculate component fees
  const usersFeeResult = calculateUsersFee(adjustedMetrics.activeUsers, tier);
  const channelsFeeResult = calculateChannelsFee(
    adjustedMetrics.publicChannels,
    tier,
    adjustedMetrics.monthlyMessageVolume
  );
  const messageVolumeFeeResult = calculateMessageVolumeFee(
    adjustedMetrics.monthlyMessageVolume,
    tier
  );

  // Calculate total
  return tierConfig.baseFee +
    usersFeeResult.fee +
    channelsFeeResult.fee +
    messageVolumeFeeResult.fee;
}

/**
 * Main pricing calculation function
 */
export function calculatePricing(
  metrics: WorkspaceMetrics,
  config: PricingConfiguration
): PricingResult {
  // Apply configuration adjustments
  const adjustedMetrics = applyConfigurationAdjustments(metrics, config);
  
  // Determine tier
  const tier = determineTier(adjustedMetrics);
  
  if (tier === 'enterprise') {
    // Return enterprise contact placeholder
    return {
      tier: 'enterprise',
      baseFee: 0,
      usersFee: 0,
      channelsFee: 0,
      messageVolumeFee: 0,
      totalMonthly: 0,
      totalAnnual: 0,
      annualDiscount: 0,
      effectivePerUserCost: 0,
      optimizationSuggestions: [],
      breakdown: {
        includedUsers: Infinity,
        additionalUsers: 0,
        includedChannels: Infinity,
        additionalChannels: 0,
        includedMessages: Infinity,
        additionalMessages: 0
      }
    };
  }

  const tierConfig = PRICING_TIERS[tier];
  
  // Calculate component fees
  const usersFeeResult = calculateUsersFee(adjustedMetrics.activeUsers, tier);
  const channelsFeeResult = calculateChannelsFee(
    adjustedMetrics.publicChannels,
    tier,
    adjustedMetrics.monthlyMessageVolume
  );
  const messageVolumeFeeResult = calculateMessageVolumeFee(
    adjustedMetrics.monthlyMessageVolume,
    tier
  );

  // Calculate totals
  const totalMonthly = 
    tierConfig.baseFee +
    usersFeeResult.fee +
    channelsFeeResult.fee +
    messageVolumeFeeResult.fee;

  const totalAnnual = totalMonthly * 12;
  const annualDiscount = totalAnnual * 0.2; // 20% discount
  const discountedAnnual = totalAnnual - annualDiscount;

  // Generate optimization suggestions
  const suggestions = generateOptimizationSuggestions(
    metrics,
    config,
    totalMonthly
  );

  return {
    tier,
    baseFee: tierConfig.baseFee,
    usersFee: usersFeeResult.fee,
    channelsFee: channelsFeeResult.fee,
    messageVolumeFee: messageVolumeFeeResult.fee,
    totalMonthly,
    totalAnnual: discountedAnnual,
    annualDiscount,
    effectivePerUserCost: totalMonthly / adjustedMetrics.activeUsers,
    optimizationSuggestions: suggestions,
    breakdown: {
      includedUsers: tierConfig.includedUsers,
      additionalUsers: usersFeeResult.additionalUsers,
      includedChannels: tierConfig.includedChannels,
      additionalChannels: channelsFeeResult.additionalChannels,
      includedMessages: tierConfig.includedMessages,
      additionalMessages: messageVolumeFeeResult.additionalMessages
    }
  };
}

/**
 * Calculate ROI based on industry benchmarks
 */
export function calculateROI(
  monthlyPrice: number,
  employees: number,
  averageSalary: number = 75000
): {
  annualCost: number;
  potentialSavings: {
    turnoverReduction: number;
    productivityGain: number;
    absenteeismReduction: number;
    total: number;
  };
  roi: number;
  paybackPeriod: number;
} {
  const annualCost = monthlyPrice * 12;
  
  // Industry benchmarks
  const turnoverCost = averageSalary * 0.75; // 75% of salary to replace
  const currentTurnover = 0.13; // 13% industry average
  const improvedTurnover = 0.08; // 8% with engagement platform
  const turnoverReduction = employees * (currentTurnover - improvedTurnover) * turnoverCost;

  // 17% productivity improvement for engaged employees
  const productivityGain = employees * averageSalary * 0.05; // Conservative 5% improvement

  // Absenteeism reduction
  const absenteeismCost = averageSalary * 0.024; // 2.4% of salary
  const absenteeismReduction = employees * absenteeismCost * 0.25; // 25% reduction

  const totalSavings = turnoverReduction + productivityGain + absenteeismReduction;
  const roi = ((totalSavings - annualCost) / annualCost) * 100;
  const paybackPeriod = annualCost / (totalSavings / 12); // Months

  return {
    annualCost,
    potentialSavings: {
      turnoverReduction,
      productivityGain,
      absenteeismReduction,
      total: totalSavings
    },
    roi,
    paybackPeriod
  };
}