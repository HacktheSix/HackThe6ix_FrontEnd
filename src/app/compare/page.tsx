"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ArrowsRightLeftIcon, 
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  GlobeAltIcon,
  BoltIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

interface ModelStats {
  accuracy: number;
  speed: number;
  memory: number;
  carbon: number;
  objectsDetected: number;
  processingTime: number;
  energyConsumption: number;
  greenScore: number;
  confidence: number;
  precision: number;
  recall: number;
  f1Score: number;
  latency: number;
  throughput: number;
}

interface ComparisonResult {
  modelA: {
    name: string;
    framework: string;
    stats: ModelStats;
  };
  modelB: {
    name: string;
    framework: string;
    stats: ModelStats;
  };
  videoUrl: string;
  status: "processing" | "completed" | "failed";
  comparisonMetrics: {
    accuracyDifference: number;
    speedDifference: number;
    carbonDifference: number;
    overallWinner: "A" | "B" | "tie";
    sustainabilityWinner: "A" | "B" | "tie";
    costWinner: "A" | "B" | "tie";
  };
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liveStats, setLiveStats] = useState({
    processingProgress: 100,
    carbonFootprint: 2.4,
    energyConsumption: 45.2,
    systemLoad: 67
  });

  const videoId = searchParams.get("video");
  const modelAId = searchParams.get("modelA");
  const modelBId = searchParams.get("modelB");

  useEffect(() => {
    if (videoId && modelAId && modelBId) {
      const mockComparison: ComparisonResult = {
        modelA: {
          name: "YOLOv8n",
          framework: "ONNX",
          stats: {
            accuracy: 85.2,
            speed: 120,
            memory: 512,
            carbon: 2.1,
            objectsDetected: 47,
            processingTime: 1.2,
            energyConsumption: 42.1,
            greenScore: 92,
            confidence: 0.89,
            precision: 0.87,
            recall: 0.84,
            f1Score: 0.85,
            latency: 8.3,
            throughput: 1440
          }
        },
        modelB: {
          name: "YOLOv8s",
          framework: "ONNX",
          stats: {
            accuracy: 88.7,
            speed: 95,
            memory: 1024,
            carbon: 3.8,
            objectsDetected: 52,
            processingTime: 1.8,
            energyConsumption: 48.5,
            greenScore: 78,
            confidence: 0.91,
            precision: 0.89,
            recall: 0.87,
            f1Score: 0.88,
            latency: 10.5,
            throughput: 9120
          }
        },
        videoUrl: "/sample-video.mp4",
        status: "completed",
        comparisonMetrics: {
          accuracyDifference: 3.5,
          speedDifference: -25,
          carbonDifference: 1.7,
          overallWinner: "B",
          sustainabilityWinner: "A",
          costWinner: "A"
        }
      };
      setComparison(mockComparison);
    }
  }, [videoId, modelAId, modelBId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        carbonFootprint: Math.max(0, prev.carbonFootprint + (Math.random() - 0.5) * 0.2),
        energyConsumption: Math.max(0, prev.energyConsumption + (Math.random() - 0.5) * 1),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getWinner = (valueA: number, valueB: number, higherIsBetter: boolean = true) => {
    if (higherIsBetter) {
      return valueA > valueB ? "A" : valueB > valueA ? "B" : "tie";
    } else {
      return valueA < valueB ? "A" : valueB < valueA ? "B" : "tie";
    }
  };

  const getWinnerColor = (winner: "A" | "B" | "tie") => {
    switch (winner) {
      case "A": return "text-green-600 dark:text-green-400";
      case "B": return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const getGreenScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  if (!comparison) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <ArrowsRightLeftIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Model Comparison Results
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {comparison.modelA.name} vs {comparison.modelB.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400">Live</span>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {comparison.modelA.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {comparison.modelA.framework}
              </p>
            </div>
            
            <div className="relative">
              <video
                className="w-full h-64 object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              >
                <source src={comparison.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <button
                    onClick={handlePlayPause}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelA.stats.accuracy}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelA.stats.speed}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">FPS</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelA.stats.memory}MB
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Memory</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelA.stats.carbon}g
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CO2</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Objects Detected:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelA.stats.objectsDetected}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Processing Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelA.stats.processingTime}s
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Energy Consumption:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelA.stats.energyConsumption}Wh
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Green Score:</span>
                  <span className={`font-medium ${getGreenScoreColor(comparison.modelA.stats.greenScore)}`}>
                    {comparison.modelA.stats.greenScore}/100
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">F1 Score:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelA.stats.f1Score.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelA.stats.latency}ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {comparison.modelB.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {comparison.modelB.framework}
              </p>
            </div>
            
            <div className="relative">
              <video
                className="w-full h-64 object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              >
                <source src={comparison.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <button
                    onClick={handlePlayPause}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelB.stats.accuracy}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelB.stats.speed}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">FPS</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelB.stats.memory}MB
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Memory</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {comparison.modelB.stats.carbon}g
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CO2</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Objects Detected:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelB.stats.objectsDetected}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Processing Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelB.stats.processingTime}s
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Energy Consumption:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelB.stats.energyConsumption}Wh
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Green Score:</span>
                  <span className={`font-medium ${getGreenScoreColor(comparison.modelB.stats.greenScore)}`}>
                    {comparison.modelB.stats.greenScore}/100
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">F1 Score:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelB.stats.f1Score.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comparison.modelB.stats.latency}ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Live System Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Carbon:</span>
                <span className="text-sm font-medium text-red-600">
                  {liveStats.carbonFootprint.toFixed(1)}g
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Energy Usage:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {liveStats.energyConsumption.toFixed(1)}Wh
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">System Load:</span>
                <span className={`text-sm font-medium ${
                  liveStats.systemLoad > 80 ? 'text-red-600' : 
                  liveStats.systemLoad > 60 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {liveStats.systemLoad}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Comparison Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy Diff:</span>
                <span className={`text-sm font-medium ${comparison.comparisonMetrics.accuracyDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comparison.comparisonMetrics.accuracyDifference > 0 ? '+' : ''}{comparison.comparisonMetrics.accuracyDifference.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Speed Diff:</span>
                <span className={`text-sm font-medium ${comparison.comparisonMetrics.speedDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comparison.comparisonMetrics.speedDifference > 0 ? '+' : ''}{comparison.comparisonMetrics.speedDifference} FPS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Carbon Diff:</span>
                <span className={`text-sm font-medium ${comparison.comparisonMetrics.carbonDifference < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comparison.comparisonMetrics.carbonDifference > 0 ? '+' : ''}{comparison.comparisonMetrics.carbonDifference.toFixed(1)}g
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Winners
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall:</span>
                <span className={`text-sm font-medium ${getWinnerColor(comparison.comparisonMetrics.overallWinner)}`}>
                  {comparison.comparisonMetrics.overallWinner === "A" ? comparison.modelA.name : comparison.modelB.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sustainability:</span>
                <span className={`text-sm font-medium ${getWinnerColor(comparison.comparisonMetrics.sustainabilityWinner)}`}>
                  {comparison.comparisonMetrics.sustainabilityWinner === "A" ? comparison.modelA.name : comparison.modelB.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Cost Efficiency:</span>
                <span className={`text-sm font-medium ${getWinnerColor(comparison.comparisonMetrics.costWinner)}`}>
                  {comparison.comparisonMetrics.costWinner === "A" ? comparison.modelA.name : comparison.modelB.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Detailed Performance Analysis
            </h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                Sustainability Report
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                Export Results
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Accuracy Winner</p>
              <p className={`text-2xl font-bold ${getWinnerColor(getWinner(comparison.modelA.stats.accuracy, comparison.modelB.stats.accuracy))}`}>
                {getWinner(comparison.modelA.stats.accuracy, comparison.modelB.stats.accuracy) === "A" ? comparison.modelA.name : comparison.modelB.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.abs(comparison.modelA.stats.accuracy - comparison.modelB.stats.accuracy).toFixed(1)}% difference
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Speed Winner</p>
              <p className={`text-2xl font-bold ${getWinnerColor(getWinner(comparison.modelA.stats.speed, comparison.modelB.stats.speed))}`}>
                {getWinner(comparison.modelA.stats.speed, comparison.modelB.stats.speed) === "A" ? comparison.modelA.name : comparison.modelB.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.abs(comparison.modelA.stats.speed - comparison.modelB.stats.speed)} FPS difference
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Green Score Winner</p>
              <p className={`text-2xl font-bold ${getWinnerColor(getWinner(comparison.modelA.stats.greenScore, comparison.modelB.stats.greenScore))}`}>
                {getWinner(comparison.modelA.stats.greenScore, comparison.modelB.stats.greenScore) === "A" ? comparison.modelA.name : comparison.modelB.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.abs(comparison.modelA.stats.greenScore - comparison.modelB.stats.greenScore)} points difference
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Carbon Efficient</p>
              <p className={`text-2xl font-bold ${getWinnerColor(getWinner(comparison.modelA.stats.carbon, comparison.modelB.stats.carbon, false))}`}>
                {getWinner(comparison.modelA.stats.carbon, comparison.modelB.stats.carbon, false) === "A" ? comparison.modelA.name : comparison.modelB.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.abs(comparison.modelA.stats.carbon - comparison.modelB.stats.carbon).toFixed(1)}g difference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
