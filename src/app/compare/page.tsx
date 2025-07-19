"use client";

import { useState } from "react";
import { 
  ArrowsRightLeftIcon, 
  PlusIcon,
  PlayIcon,
  CogIcon,
  DocumentIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";
import { ComparisonTable } from "@/components/ComparisonTable";

interface Model {
  id: string;
  name: string;
  framework: string;
  size: string;
  accuracy: number;
  uploadDate: string;
}

interface ModelComparison {
  id: string;
  modelA: {
    name: string;
    framework: string;
    size: string;
  };
  modelB: {
    name: string;
    framework: string;
    size: string;
  };
  metrics: {
    accuracy: {
      modelA: number;
      modelB: number;
      winner: "A" | "B" | "tie";
    };
    speed: {
      modelA: number;
      modelB: number;
      winner: "A" | "B" | "tie";
    };
    memory: {
      modelA: number;
      modelB: number;
      winner: "A" | "B" | "tie";
    };
    carbon: {
      modelA: number;
      modelB: number;
      winner: "A" | "B" | "tie";
    };
  };
  status: "completed" | "running" | "failed";
  createdAt: string;
}

export default function ComparePage() {
  const [selectedModelA, setSelectedModelA] = useState<string>("");
  const [selectedModelB, setSelectedModelB] = useState<string>("");
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonConfig, setComparisonConfig] = useState({
    testDataset: "coco_val",
    batchSize: 1,
    iterations: 100,
    includeCarbonMetrics: true,
    includeMemoryMetrics: true
  });

  // Mock data
  const availableModels: Model[] = [
    { id: "1", name: "YOLOv8n", framework: "ONNX", size: "6.2MB", accuracy: 85.2, uploadDate: "2024-01-15" },
    { id: "2", name: "YOLOv8s", framework: "ONNX", size: "22.6MB", accuracy: 88.7, uploadDate: "2024-01-16" },
    { id: "3", name: "YOLOv8m", framework: "ONNX", size: "52.2MB", accuracy: 91.3, uploadDate: "2024-01-17" },
    { id: "4", name: "YOLOv8l", framework: "ONNX", size: "87.7MB", accuracy: 93.1, uploadDate: "2024-01-18" },
    { id: "5", name: "YOLOv8x", framework: "ONNX", size: "136.7MB", accuracy: 94.2, uploadDate: "2024-01-19" },
    { id: "6", name: "Custom YOLO v9", framework: "PyTorch", size: "45.3MB", accuracy: 89.5, uploadDate: "2024-01-20" },
  ];

  const mockComparisons: ModelComparison[] = [
    {
      id: "1",
      modelA: { name: "YOLOv8n", framework: "ONNX", size: "6.2MB" },
      modelB: { name: "YOLOv8s", framework: "ONNX", size: "22.6MB" },
      metrics: {
        accuracy: { modelA: 85.2, modelB: 88.7, winner: "B" },
        speed: { modelA: 120, modelB: 95, winner: "A" },
        memory: { modelA: 512, modelB: 1024, winner: "A" },
        carbon: { modelA: 2.1, modelB: 3.8, winner: "A" }
      },
      status: "completed",
      createdAt: "2024-01-20T10:30:00Z"
    },
    {
      id: "2",
      modelA: { name: "YOLOv8m", framework: "ONNX", size: "52.2MB" },
      modelB: { name: "YOLOv8l", framework: "ONNX", size: "87.7MB" },
      metrics: {
        accuracy: { modelA: 91.3, modelB: 93.1, winner: "B" },
        speed: { modelA: 65, modelB: 45, winner: "A" },
        memory: { modelA: 2048, modelB: 3072, winner: "A" },
        carbon: { modelA: 6.2, modelB: 9.1, winner: "A" }
      },
      status: "completed",
      createdAt: "2024-01-19T14:15:00Z"
    }
  ];

  const handleStartComparison = () => {
    if (!selectedModelA || !selectedModelB) return;
    
    setIsComparing(true);
    
    // Simulate comparison process
    setTimeout(() => {
      setIsComparing(false);
      // In a real app, this would trigger the actual comparison
    }, 3000);
  };

  const handleViewDetails = (comparison: ModelComparison) => {
    console.log("View details for comparison:", comparison.id);
    // In a real app, this would navigate to a detailed view
  };

  const handleExport = (comparison: ModelComparison) => {
    console.log("Export comparison:", comparison.id);
    // In a real app, this would generate and download a report
  };

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setComparisonConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ArrowsRightLeftIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Model Comparison
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Compare your models across accuracy, speed, memory usage, and carbon footprint
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comparison Setup */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Select Models
              </h2>
              
              <div className="space-y-4">
                {/* Model A Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Model A
                  </label>
                  <select
                    value={selectedModelA}
                    onChange={(e) => setSelectedModelA(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a model</option>
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.framework}, {model.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* VS Indicator */}
                <div className="flex items-center justify-center py-2">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">VS</span>
                  </div>
                </div>

                {/* Model B Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Model B
                  </label>
                  <select
                    value={selectedModelB}
                    onChange={(e) => setSelectedModelB(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a model</option>
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.framework}, {model.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Comparison Button */}
                <button
                  onClick={handleStartComparison}
                  disabled={!selectedModelA || !selectedModelB || isComparing}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isComparing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Comparing...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Start Comparison
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comparison Configuration */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <CogIcon className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Configuration
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* Test Dataset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Test Dataset
                  </label>
                  <select
                    value={comparisonConfig.testDataset}
                    onChange={(e) => handleConfigChange("testDataset", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="coco_val">COCO Validation</option>
                    <option value="coco_test">COCO Test</option>
                    <option value="custom">Custom Dataset</option>
                  </select>
                </div>

                {/* Batch Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Batch Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={comparisonConfig.batchSize}
                    onChange={(e) => handleConfigChange("batchSize", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Iterations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Iterations
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={comparisonConfig.iterations}
                    onChange={(e) => handleConfigChange("iterations", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Metrics Options */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeCarbonMetrics"
                      checked={comparisonConfig.includeCarbonMetrics}
                      onChange={(e) => handleConfigChange("includeCarbonMetrics", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeCarbonMetrics" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Include carbon metrics
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeMemoryMetrics"
                      checked={comparisonConfig.includeMemoryMetrics}
                      onChange={(e) => handleConfigChange("includeMemoryMetrics", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeMemoryMetrics" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Include memory metrics
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                  Upload New Model
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <DocumentIcon className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Results */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Comparison Results
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    All
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Completed
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Running
                  </button>
                </div>
              </div>
              
              <ComparisonTable
                comparisons={mockComparisons}
                onViewDetails={handleViewDetails}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
