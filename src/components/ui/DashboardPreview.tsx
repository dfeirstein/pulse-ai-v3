"use client";

import React from "react";
import { HealthScoreGauge } from "./HealthScoreGauge";
import { TrendingUp, TrendingDown, Users, Brain, Zap } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change && change > 0;
  
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-600 mb-1">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className="text-gray-400 ml-2">
          {icon}
        </div>
      </div>
    </div>
  );
};

export const DashboardPreview: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Team Health Dashboard</h3>
          <p className="text-sm text-gray-600">Real-time Slack insights</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          Live
        </span>
      </div>

      {/* Health Scores */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <HealthScoreGauge score={85} label="Overall Health" color="#10B981" size="md" />
        <HealthScoreGauge score={72} label="Engagement" color="#F59E0B" size="md" />
        <HealthScoreGauge score={91} label="Sentiment" color="#6B46C1" size="md" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard
          title="Active Users"
          value="142"
          change={12}
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          title="Response Time"
          value="2.3h"
          change={-15}
          icon={<Zap className="w-4 h-4" />}
        />
        <MetricCard
          title="Burnout Risk"
          value="Low"
          icon={<Brain className="w-4 h-4" />}
        />
        <MetricCard
          title="Team Mood"
          value="😊"
          icon={<span className="text-lg">💭</span>}
        />
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-purple/10 to-turquoise/10 rounded-lg p-4 border border-purple/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-1">AI Recommendation</p>
            <p className="text-xs text-gray-700">
              Schedule a team check-in. Engagement has dropped 8% since last week, particularly in the #engineering channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};