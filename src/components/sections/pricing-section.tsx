'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, Sparkles, TrendingUp, Users, MessageSquare, RefreshCw, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ConnectSlackButton } from '@/components/ui/connect-slack-button';
import { calculatePricing, calculateROI, type WorkspaceMetrics, type PricingConfiguration } from '@/lib/pricing-calculator';

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 49,
    period: 'month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 15 users',
      '5 channels tracked',
      '10,000 messages/month',
      'Weekly sentiment refresh',
      'Basic analytics',
      'Email support'
    ],
    highlighted: false
  },
  {
    name: 'Growth',
    price: 149,
    period: 'month',
    description: 'For growing teams that need deeper insights',
    features: [
      'Up to 50 users',
      '20 channels tracked',
      '50,000 messages/month',
      'Daily sentiment refresh',
      'AI-powered insights',
      'Priority support',
      'Custom alerts'
    ],
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Scale',
    price: 399,
    period: 'month',
    description: 'For larger organizations with complex needs',
    features: [
      'Up to 200 users',
      '50 channels tracked',
      '200,000 messages/month',
      'Real-time monitoring',
      'Predictive analytics',
      'API access',
      'Dedicated success manager'
    ],
    highlighted: false
  },
  {
    name: 'Enterprise',
    price: null,
    period: null,
    description: 'Custom solutions for large enterprises',
    features: [
      'Unlimited users & channels',
      'Custom message volumes',
      'White-label options',
      'Custom integrations',
      'SLA guarantees',
      'On-premise deployment'
    ],
    highlighted: false
  }
];

export function PricingSection() {
  const [users, setUsers] = useState(50);
  const [channels, setChannels] = useState(15);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [optimizedPrice, setOptimizedPrice] = useState(0);
  const [roiData, setRoiData] = useState<ReturnType<typeof calculateROI> | null>(null);
  const [avgSalary, setAvgSalary] = useState(75000);

  // Calculate pricing when sliders change
  useEffect(() => {
    const metrics: WorkspaceMetrics = {
      totalUsers: users,
      activeUsers: users,
      publicChannels: channels,
      privateChannels: 0,
      monthlyMessageVolume: users * 500, // Estimate 500 messages per user per month
      dailyActiveUsers: Math.floor(users * 0.8),
      workspaceName: 'Your Company'
    };

    const config: PricingConfiguration = {
      trackedUsers: users,
      trackedChannels: channels,
      messagesampling: 1,
      businessHoursOnly: false,
      excludeWeekends: false,
      excludeBots: false,
      refreshRate: 'daily'
    };

    const pricing = calculatePricing(metrics, config);
    setEstimatedPrice(pricing.totalMonthly);

    // Calculate optimized price
    const optimizedConfig: PricingConfiguration = {
      ...config,
      trackedChannels: Math.min(channels, 20),
      businessHoursOnly: true,
      excludeBots: true
    };
    const optimizedPricing = calculatePricing(metrics, optimizedConfig);
    setOptimizedPrice(optimizedPricing.totalMonthly);
  }, [users, channels]);

  // Calculate ROI using the users value from pricing calculator
  useEffect(() => {
    const roi = calculateROI(estimatedPrice, users, avgSalary);
    setRoiData(roi);
  }, [estimatedPrice, users, avgSalary]);

  return (
    <section id="pricing" className="py-24 bg-background-warm relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple/10 animate-float">
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="absolute top-40 right-20 text-turquoise/10 animate-float" style={{ animationDelay: '1s' }}>
          <TrendingUp className="w-10 h-10" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-orange/10 animate-float" style={{ animationDelay: '2s' }}>
          <Users className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 right-1/3 text-pink/10 animate-float" style={{ animationDelay: '0.5s' }}>
          <MessageSquare className="w-10 h-10" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-section font-serif font-bold text-gray-900 mb-4">
            Transparent pricing that{' '}
            <span className="font-handwritten text-purple">grows with you</span>
          </h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
            See your exact price before you commit. Optimize costs with smart controls. 
            No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PRICING_TIERS.map((tier, index) => (
            <Card
              key={tier.name}
              className={`
                relative bg-white rounded-2xl transition-all duration-300 hover-lift flex flex-col
                ${tier.highlighted ? 'ring-2 ring-purple shadow-xl' : 'shadow-lg hover:shadow-xl'}
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-purple text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    {tier.price ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                        <span className="text-gray-600">/{tier.period}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">Custom</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 min-h-[2.5rem]">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-turquoise flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.highlighted ? "default" : "secondary"}
                  className={`w-full rounded-full font-semibold mt-auto ${
                    tier.highlighted ? 'bg-black text-white hover:bg-gray-800' : ''
                  }`}
                >
                  {tier.price ? 'Start Free Trial' : 'Contact Sales'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Interactive Pricing Calculator */}
        <div className="max-w-4xl mx-auto mb-24">
          <Card className="card-culture p-8 bg-white">
            <div className="text-center mb-8">
              <h3 className="text-subsection font-serif font-bold text-gray-900 mb-2">
                See your <span className="font-handwritten text-purple">exact price</span>
              </h3>
              <p className="text-gray-600">
                Adjust the sliders to match your team size and needs
              </p>
            </div>

            <div className="space-y-8">
              {/* Users Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple" />
                    Team size
                  </label>
                  <span className="text-sm font-bold text-purple bg-purple/5 px-3 py-1 rounded-full">
                    {users} users
                  </span>
                </div>
                <Slider
                  value={[users]}
                  onValueChange={(value) => setUsers(value[0] || 50)}
                  min={10}
                  max={500}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              {/* Channels Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple" />
                    Channels to track
                  </label>
                  <span className="text-sm font-bold text-purple bg-purple/5 px-3 py-1 rounded-full">
                    {channels} channels
                  </span>
                </div>
                <Slider
                  value={[channels]}
                  onValueChange={(value) => setChannels(value[0] || 15)}
                  min={5}
                  max={50}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Your estimated price</p>
                <p className="text-5xl font-bold text-gray-900 mb-3">
                  ${estimatedPrice}<span className="text-xl font-normal text-gray-600">/month</span>
                </p>
                {optimizedPrice < estimatedPrice && (
                  <p className="text-sm text-turquoise font-medium flex items-center justify-center gap-1 mb-4">
                    <Sparkles className="w-4 h-4" />
                    Optimize to ${optimizedPrice}/month
                  </p>
                )}
                <ConnectSlackButton 
                  className="bg-black text-white hover:bg-gray-800 rounded-full font-semibold px-8 py-3"
                  onConnect={() => console.log('Starting Slack OAuth from pricing...')}
                >
                  Connect Slack for exact pricing
                  <ChevronRight className="w-4 h-4 ml-2" />
                </ConnectSlackButton>
              </div>
            </div>
          </Card>
        </div>

        {/* ROI Calculator */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="card-culture p-8 bg-white">
            <div className="text-center mb-8">
              <h3 className="text-subsection font-serif font-bold text-gray-900 mb-2">
                Calculate your ROI
              </h3>
              <p className="font-handwritten text-purple text-2xl">
                spoiler: it&apos;s huge
              </p>
            </div>

            <div className="space-y-8">
              {/* Display Company Size from Pricing Calculator */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple" />
                  <span className="text-sm font-medium text-gray-700">Your team size</span>
                </div>
                <span className="text-sm font-bold text-purple bg-purple/5 px-3 py-1 rounded-full">
                  {users} employees
                </span>
              </div>

              {/* Average Salary Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple" />
                    Average salary
                  </label>
                  <span className="text-sm font-bold text-purple bg-purple/5 px-3 py-1 rounded-full">
                    ${(avgSalary / 1000).toFixed(0)}k
                  </span>
                </div>
                <Slider
                  value={[avgSalary]}
                  onValueChange={(value) => setAvgSalary(value[0] || 75000)}
                  min={40000}
                  max={200000}
                  step={5000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>$40k</span>
                  <span>$200k</span>
                </div>
              </div>

              {/* ROI Results */}
              {roiData && (
                <div className="space-y-4">
                  {/* Benefits Breakdown */}
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">With Pulse AI at ${estimatedPrice}/month:</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-700 text-sm">
                          <TrendingUp className="w-4 h-4 text-turquoise" />
                          2% reduction in turnover
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                          ${Math.round(roiData.potentialSavings.turnoverReduction).toLocaleString()}/year
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-700 text-sm">
                          <Sparkles className="w-4 h-4 text-purple" />
                          5% productivity increase
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                          ${Math.round(roiData.potentialSavings.productivityGain).toLocaleString()}/year
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-700 text-sm">
                          <RefreshCw className="w-4 h-4 text-orange" />
                          10% fewer sick days
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                          ${Math.round(roiData.potentialSavings.absenteeismReduction).toLocaleString()}/year
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hero ROI Display */}
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Your ROI</p>
                    <p className="text-5xl font-bold text-gray-900 mb-3">
                      {Math.round(roiData.roi).toLocaleString()}%
                    </p>
                    <p className="text-sm text-gray-600">
                      ${Math.round(roiData.potentialSavings.total).toLocaleString()} in annual savings
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 bg-white shadow-lg animate-fade-in-up">
            <p className="text-gray-700 mb-4">
              &quot;Finally, pricing that makes sense for our team size. We only pay for what we use.&quot;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/testimonial-sarah-k.jpg"
                alt="Sarah K."
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">Sarah K.</p>
                <p className="text-sm text-gray-600">CTO, 85 employees</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-gray-700 mb-4">
              &quot;70% cheaper than Culture Amp with better real-time insights. No-brainer decision.&quot;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/testimonial-michael-r.jpg"
                alt="Michael R."
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">Michael R.</p>
                <p className="text-sm text-gray-600">HR Director, 200 employees</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-700 mb-4">
              &quot;The optimization controls let us balance insights with budget. Perfect flexibility.&quot;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/testimonial-jessica-l.jpg"
                alt="Jessica L."
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">Jessica L.</p>
                <p className="text-sm text-gray-600">VP People, 350 employees</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-purple/10 to-turquoise/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Start your <span className="font-handwritten text-purple">14-day free trial</span>
            </h3>
            <p className="text-gray-600 mb-6">
              No credit card required. 3 free sentiment refreshes. See your exact pricing instantly.
            </p>
            <ConnectSlackButton 
              size="lg"
              className="bg-black text-white hover:bg-gray-800 rounded-full font-semibold px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-200"
              onConnect={() => console.log('Starting Slack OAuth from pricing CTA...')}
            >
              Connect Slack & Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </ConnectSlackButton>
          </div>
        </div>
      </div>
    </section>
  );
}