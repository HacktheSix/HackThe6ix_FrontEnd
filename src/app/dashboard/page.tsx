"use client";

import { useState, useEffect } from "react";
import { 
  ChartBarIcon, 
  CloudArrowUpIcon, 
  ArrowsRightLeftIcon,
  BoltIcon,
  GlobeAltIcon,
  ClockIcon,
  DocumentIcon,
  UserGroupIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ServerIcon,
  WifiIcon
} from "@heroicons/react/24/outline";
import { ChartContainer, MetricCard } from "@/components/ChartCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface LiveStats {
  activeComparisons: number;
  queueLength: number;
  systemLoad: number;
  carbonFootprint: number;
  energyConsumption: number;
  uptime: number;
  responseTime: number;
  errorRate: number;
}

interface SustainabilityMetrics {
  totalCarbonSaved: number;
  greenScore: number;
  energyEfficiency: number;
  renewableEnergyUsage: number;
  carbonOffset: number;
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeComparisons: 12,
    queueLength: 5,
    systemLoad: 67,
    carbonFootprint: 2.4,
    energyConsumption: 45.2,
    uptime: 99.8,
    responseTime: 245,
    errorRate: 0.2
  });
  const [sustainability, setSustainability] = useState<SustainabilityMetrics>({
    totalCarbonSaved: 12.8,
    greenScore: 87,
    energyEfficiency: 92,
    renewableEnergyUsage: 78,
    carbonOffset: 8.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeComparisons: prev.activeComparisons + Math.floor(Math.random() * 3) - 1,
        queueLength: Math.max(0, prev.queueLength + Math.floor(Math.random() * 3) - 1),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 10)),
        carbonFootprint: Math.max(0, prev.carbonFootprint + (Math.random() - 0.5) * 0.5),
        energyConsumption: Math.max(0, prev.energyConsumption + (Math.random() - 0.5) * 2),
        responseTime: Math.max(50, prev.responseTime + (Math.random() - 0.5) * 50),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const performanceData = {
    labels: ['YOLOv8n', 'YOLOv8s', 'YOLOv8m', 'YOLOv8l', 'YOLOv8x'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [85.2, 88.7, 91.3, 93.1, 94.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Speed (FPS)',
        data: [120, 95, 65, 45, 30],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const comparisonTrends = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Comparisons',
        data: [12, 19, 15, 25, 22, 18, 24],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const modelDistribution = {
    labels: ['YOLO', 'ONNX', 'PyTorch', 'TensorFlow', 'Custom'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const carbonMetrics = {
    labels: ['YOLOv8n', 'YOLOv8s', 'YOLOv8m', 'YOLOv8l', 'YOLOv8x'],
    datasets: [
      {
        label: 'Carbon Footprint (g CO2)',
        data: [2.1, 3.8, 6.2, 9.1, 12.5],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const sustainabilityRadar = {
    labels: ['Energy Efficiency', 'Carbon Footprint', 'Renewable Energy', 'Green Score', 'Carbon Offset'],
    datasets: [
      {
        label: 'Current Performance',
        data: [sustainability.energyEfficiency, 100 - (sustainability.greenScore), sustainability.renewableEnergyUsage, sustainability.greenScore, sustainability.carbonOffset * 10],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        pointBackgroundColor: 'rgb(34, 197, 94)',
      },
    ],
  };

  const realTimeMetrics = {
    labels: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m'],
    datasets: [
      {
        label: 'System Load (%)',
        data: [65, 68, 72, 70, 67, 69, 71, 68, 66, liveStats.systemLoad],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Response Time (ms)',
        data: [240, 245, 250, 248, 242, 246, 249, 244, 241, liveStats.responseTime],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Corporate Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Real-time model comparison analytics and sustainability insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400">Live</span>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Models"
            value="1,247"
            subtitle="Uploaded models"
            icon={<CloudArrowUpIcon className="h-5 w-5 text-blue-600" />}
            trend={{ value: 12, type: "increase", period: "last month" }}
          />
          <MetricCard
            title="Active Comparisons"
            value={liveStats.activeComparisons}
            subtitle="Currently running"
            icon={<ArrowsRightLeftIcon className="h-5 w-5 text-green-600" />}
            trend={{ value: 8, type: "increase", period: "last hour" }}
          />
          <MetricCard
            title="Green Score"
            value={`${sustainability.greenScore}/100`}
            subtitle="Sustainability rating"
            icon={<GlobeAltIcon className="h-5 w-5 text-green-600" />}
            trend={{ value: 5, type: "increase", period: "last week" }}
          />
          <MetricCard
            title="Carbon Saved"
            value={`${sustainability.totalCarbonSaved}kg`}
            subtitle="CO2 equivalent"
            icon={<GlobeAltIcon className="h-5 w-5 text-green-600" />}
            trend={{ value: 15, type: "increase", period: "last month" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartContainer title="Real-time System Performance">
              <Line
                data={realTimeMetrics}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </ChartContainer>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Live System Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">System Load</span>
                  <span className={`text-sm font-medium ${
                    liveStats.systemLoad > 80 ? 'text-red-600' : 
                    liveStats.systemLoad > 60 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {liveStats.systemLoad}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Queue Length</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {liveStats.queueLength}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {liveStats.responseTime}ms
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                  <span className="text-sm font-medium text-green-600">
                    {liveStats.uptime}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Error Rate</span>
                  <span className={`text-sm font-medium ${
                    liveStats.errorRate > 2 ? 'text-red-600' : 
                    liveStats.errorRate > 1 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {liveStats.errorRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Sustainability Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Energy Efficiency</span>
                  <span className="text-sm font-medium text-green-600">
                    {sustainability.energyEfficiency}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Renewable Energy</span>
                  <span className="text-sm font-medium text-green-600">
                    {sustainability.renewableEnergyUsage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Carbon Offset</span>
                  <span className="text-sm font-medium text-green-600">
                    {sustainability.carbonOffset}kg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current Carbon</span>
                  <span className="text-sm font-medium text-red-600">
                    {liveStats.carbonFootprint}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartContainer title="Model Performance Comparison">
            <Line
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </ChartContainer>

          <ChartContainer title="Sustainability Radar">
            <Radar
              data={sustainabilityRadar}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartContainer title="Model Type Distribution">
            <Doughnut
              data={modelDistribution}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </ChartContainer>

          <ChartContainer title="Carbon Footprint by Model">
            <Bar
              data={carbonMetrics}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </ChartContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Activity & Alerts
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Export Report
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View All
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              {
                action: "Model comparison completed",
                models: "YOLOv8n vs YOLOv8s",
                time: "2 minutes ago",
                user: "John Doe",
                status: "success",
                priority: "normal"
              },
              {
                action: "High carbon footprint detected",
                models: "YOLOv8l processing",
                time: "5 minutes ago",
                user: "System Alert",
                status: "warning",
                priority: "high"
              },
              {
                action: "New model uploaded",
                models: "custom_yolo_v9.onnx",
                time: "15 minutes ago",
                user: "Jane Smith",
                status: "upload",
                priority: "normal"
              },
              {
                action: "System optimization completed",
                models: "Energy efficiency improved",
                time: "1 hour ago",
                user: "System",
                status: "success",
                priority: "normal"
              },
              {
                action: "Comparison failed",
                models: "YOLOv8l vs YOLOv8x",
                time: "1 hour ago",
                user: "Bob Johnson",
                status: "error",
                priority: "medium"
              },
              {
                action: "Sustainability report generated",
                models: "Q1 Green Metrics",
                time: "2 hours ago",
                user: "Alice Brown",
                status: "report",
                priority: "normal"
              }
            ].map((activity, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${
                activity.priority === "high" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" :
                activity.priority === "medium" ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800" :
                "bg-gray-50 dark:bg-gray-700"
              }`}>
                <div className="flex-shrink-0">
                  {activity.status === "success" && (
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  {activity.status === "warning" && (
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                    </div>
                  )}
                  {activity.status === "upload" && (
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <CloudArrowUpIcon className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  {activity.status === "error" && (
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <DocumentIcon className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                  {activity.status === "report" && (
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <ChartBarIcon className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.models}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.user}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
