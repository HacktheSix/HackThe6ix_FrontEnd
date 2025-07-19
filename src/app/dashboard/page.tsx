"use client";

import { useState } from "react";
import { 
  ChartBarIcon, 
  CloudArrowUpIcon, 
  ArrowsRightLeftIcon,
  BoltIcon,
  GlobeAltIcon,
  ClockIcon,
  DocumentIcon,
  UserGroupIcon
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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for charts
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Model comparison analytics and insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Models"
            value="1,247"
            subtitle="Uploaded models"
            icon={<CloudArrowUpIcon className="h-5 w-5 text-blue-600" />}
            trend={{ value: 12, type: "increase", period: "last month" }}
          />
          <MetricCard
            title="Comparisons"
            value="3,891"
            subtitle="Model comparisons"
            icon={<ArrowsRightLeftIcon className="h-5 w-5 text-green-600" />}
            trend={{ value: 8, type: "increase", period: "last month" }}
          />
          <MetricCard
            title="Avg Performance"
            value="89.2%"
            subtitle="Mean accuracy"
            icon={<BoltIcon className="h-5 w-5 text-yellow-600" />}
            trend={{ value: 2.1, type: "increase", period: "last month" }}
          />
          <MetricCard
            title="Carbon Saved"
            value="2.4kg"
            subtitle="CO2 equivalent"
            icon={<GlobeAltIcon className="h-5 w-5 text-red-600" />}
            trend={{ value: 15, type: "increase", period: "last month" }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Comparison */}
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

          {/* Comparison Trends */}
          <ChartContainer title="Comparison Activity">
            <Line
              data={comparisonTrends}
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

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Model Distribution */}
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

          {/* Carbon Footprint */}
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

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              {
                action: "Model comparison completed",
                models: "YOLOv8n vs YOLOv8s",
                time: "2 minutes ago",
                user: "John Doe",
                status: "success"
              },
              {
                action: "New model uploaded",
                models: "custom_yolo_v9.onnx",
                time: "15 minutes ago",
                user: "Jane Smith",
                status: "upload"
              },
              {
                action: "Comparison failed",
                models: "YOLOv8l vs YOLOv8x",
                time: "1 hour ago",
                user: "Bob Johnson",
                status: "error"
              },
              {
                action: "Report generated",
                models: "Performance Analysis Q1",
                time: "2 hours ago",
                user: "Alice Brown",
                status: "report"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.status === "success" && (
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <ArrowsRightLeftIcon className="h-4 w-4 text-green-600" />
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
