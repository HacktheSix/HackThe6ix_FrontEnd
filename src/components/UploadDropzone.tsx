"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
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

interface UploadDropzoneProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export function UploadDropzone({ 
  onFilesUploaded, 
  maxFiles = 1,
  acceptedTypes = [".mp4", ".avi", ".mov", ".mkv", ".webm"]
}: UploadDropzoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type || "video/mp4",
      status: "uploading" as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsUploading(true);

    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === file.id) {
              const newProgress = Math.min(f.progress + Math.random() * 20, 100);
              const newStatus = newProgress >= 100 ? "success" : "uploading";
              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          })
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setIsUploading(false);
        onFilesUploaded(newFiles);
      }, 3000 + index * 500);
    });
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/avi': ['.avi'],
      'video/quicktime': ['.mov'],
      'video/x-matroska': ['.mkv'],
      'video/webm': ['.webm']
    },
    maxFiles,
    maxSize: 500 * 1024 * 1024,
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : isDragReject
            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {isDragActive
              ? "Drop your video file here"
              : "Drag & drop video file here"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Supported formats: {acceptedTypes.join(", ")} (max {maxFiles} file, 500MB)
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Uploaded Video ({uploadedFiles.length}/{maxFiles})
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <DocumentIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {file.status === "uploading" && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(file.progress)}%
                      </span>
                    </div>
                  )}
                  {file.status === "success" && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                  {file.status === "error" && (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                  )}

                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    disabled={file.status === "uploading"}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
            <span className="text-gray-500 dark:text-gray-400">
              {uploadedFiles.filter(f => f.status === "success").length} / {uploadedFiles.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(uploadedFiles.filter(f => f.status === "success").length / uploadedFiles.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 