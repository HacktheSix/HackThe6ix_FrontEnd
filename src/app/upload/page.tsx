"use client";

import { useState } from "react";
import { UploadDropzone } from "@/components/UploadDropzone";
import { 
  CloudArrowUpIcon, 
  CogIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [modelConfig, setModelConfig] = useState({
    framework: "auto",
    inputShape: "",
    batchSize: 1,
    enableQuantization: false,
    enableOptimization: true
  });

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setModelConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CloudArrowUpIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Your Models
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your YOLO, ONNX, PyTorch, or TensorFlow models for comparison and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Model Files
              </h2>
              <UploadDropzone 
                onFilesUploaded={handleFilesUploaded}
                maxFiles={10}
              />
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Model Configuration */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <CogIcon className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Model Configuration
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* Framework Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Framework
                  </label>
                  <select
                    value={modelConfig.framework}
                    onChange={(e) => handleConfigChange("framework", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="onnx">ONNX</option>
                    <option value="pytorch">PyTorch</option>
                    <option value="tensorflow">TensorFlow</option>
                    <option value="yolo">YOLO</option>
                  </select>
                </div>

                {/* Input Shape */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input Shape (optional)
                  </label>
                  <input
                    type="text"
                    value={modelConfig.inputShape}
                    onChange={(e) => handleConfigChange("inputShape", e.target.value)}
                    placeholder="e.g., 1,3,640,640"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                    value={modelConfig.batchSize}
                    onChange={(e) => handleConfigChange("batchSize", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Optimization Options */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableOptimization"
                      checked={modelConfig.enableOptimization}
                      onChange={(e) => handleConfigChange("enableOptimization", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableOptimization" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable model optimization
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableQuantization"
                      checked={modelConfig.enableQuantization}
                      onChange={(e) => handleConfigChange("enableQuantization", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableQuantization" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable quantization
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <h4 className="font-medium mb-2">Upload Guidelines</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Supported formats: ONNX, PyTorch (.pt/.pth), TensorFlow (.pb/.tflite)</li>
                    <li>• Maximum file size: 500MB per file</li>
                    <li>• Maximum files: 10 per upload session</li>
                    <li>• Models will be automatically validated and optimized</li>
                    <li>• All uploads are encrypted and secure</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upload Stats */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Upload Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Files:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {uploadedFiles.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Successfully Uploaded:</span>
                    <span className="text-sm font-medium text-green-600">
                      {uploadedFiles.filter(f => f.status === "success").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Size:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {(uploadedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
