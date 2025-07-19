"use client";

import { ReactNode } from "react";
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  MinusIcon
} from "@heroicons/react/24/outline";

interface ChartCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ChartCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  children,
  className = ""
}: ChartCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case "increase":
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
      case "decrease":
        return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600 dark:text-green-400";
      case "decrease":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon && (
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </h3>
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="ml-1">
              {change > 0 ? "+" : ""}{Math.round(change)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white break-words">
          {value}
        </p>
      </div>

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon,
  trend
}: MetricCardProps) {
  return (
    <ChartCard
      title={title}
      value={value}
      change={trend?.value}
      changeType={trend?.type}
      icon={icon}
    >
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
      {trend && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          vs {trend.period}
        </p>
      )}
    </ChartCard>
  );
}

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartContainer({ title, children, className = "" }: ChartContainerProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center mb-6">
        <ChartBarIcon className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="h-64">
        {children}
      </div>
    </div>
  );
} 