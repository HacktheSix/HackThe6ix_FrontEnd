"use client";

import { useState } from "react";
import { UploadDropzone } from "@/components/UploadDropzone";
import { 
  CloudArrowUpIcon, 
  CogIcon,
  InformationCircleIcon,
  PlayIcon
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

interface Model {
  id: string;
  name: string;
  framework: string;
  accuracy: number;
  speed: number;
}

export default function UploadPage() {
  const [uploadedVideo, setUploadedVideo] = useState<UploadedFile | null>(null);
  const [selectedModelA, setSelectedModelA] = useState<string>("");
  const [selectedModelB, setSelectedModelB] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const availableModels: Model[] = [
    { id: "1", name: "YOLOv8n", framework: "ONNX", accuracy: 85.2, speed: 120 },
    { id: "2", name: "YOLOv8s", framework: "ONNX", accuracy: 88.7, speed: 95 },
    { id: "3", name: "YOLOv8m", framework: "ONNX", accuracy: 91.3, speed: 65 },
    { id: "4", name: "YOLOv8l", framework: "ONNX", accuracy: 93.1, speed: 45 },
    { id: "5", name: "YOLOv8x", framework: "ONNX", accuracy: 94.2, speed: 30 },
    { id: "6", name: "Custom YOLO v9", framework: "PyTorch", accuracy: 89.5, speed: 80 },
  ];

  const handleVideoUploaded = (files: UploadedFile[]) => {
    if (files.length > 0) {
      setUploadedVideo(files[0]);
    }
  };

  const handleStartComparison = () => {
    if (!uploadedVideo || !selectedModelA || !selectedModelB) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      window.location.href = `/compare?video=${uploadedVideo.id}&modelA=${selectedModelA}&modelB=${selectedModelB}`;
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CloudArrowUpIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Video for Model Comparison
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload a video and select two models to compare their performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Upload Video
              </h2>
              <UploadDropzone 
                onFilesUploaded={handleVideoUploaded}
                maxFiles={1}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <h4 className="font-medium mb-2">Video Requirements</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Supported formats: MP4, AVI, MOV, MKV, WebM</li>
                    <li>• Maximum file size: 500MB</li>
                    <li>• Recommended resolution: 720p or higher</li>
                    <li>• Video will be processed for object detection</li>
                    <li>• Processing time depends on video length</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Select Models for Comparison
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Model A
                  </label>
                  <select
                    value={selectedModelA}
                    onChange={(e) => setSelectedModelA(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Model A</option>
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.accuracy}% accuracy, {model.speed} FPS
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">VS</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Model B
                  </label>
                  <select
                    value={selectedModelB}
                    onChange={(e) => setSelectedModelB(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Model B</option>
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.accuracy}% accuracy, {model.speed} FPS
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleStartComparison}
                  disabled={!uploadedVideo || !selectedModelA || !selectedModelB || isProcessing}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing Video...
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

            {uploadedVideo && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Video Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">File Name:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {uploadedVideo.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">File Size:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`text-sm font-medium ${
                      uploadedVideo.status === "success" ? "text-green-600" : 
                      uploadedVideo.status === "error" ? "text-red-600" : "text-blue-600"
                    }`}>
                      {uploadedVideo.status === "success" ? "Ready" : 
                       uploadedVideo.status === "error" ? "Failed" : "Uploading"}
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
