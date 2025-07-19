import Link from "next/link";
import { 
  CloudArrowUpIcon, 
  ArrowsRightLeftIcon, 
  ChartBarIcon, 
  BoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse-slow"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up font-display">
              Compare YOLO & Vision Models
              <span className="block text-blue-600 dark:text-blue-400 animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto animate-slide-up-delay">
              Upload models, compare performance, get carbon metrics for green, sustainable AI. 
              Built for ML teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
              <Link
                href="/upload"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-gentle"
              >
                <CloudArrowUpIcon className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                Upload Your Models
              </Link>
              <Link
                href="/compare"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <ArrowsRightLeftIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Comparing
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up font-display">
              Powerful Features for Model Analysis
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up-delay">
              Everything you need to evaluate, compare, and optimize your computer vision models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle">
                <CloudArrowUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Model Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Drag and drop your YOLO models, ONNX files, or custom vision models. 
                Support for multiple formats and architectures.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
                <ArrowsRightLeftIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Side-by-Side Comparison
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compare models across accuracy, speed, memory usage, and carbon footprint. 
                Get detailed performance metrics and visualizations.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
                <ChartBarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive dashboards with real-time metrics, performance trends, 
                and detailed comparison reports.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>
                <BoltIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast Inference
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized inference pipeline with GPU acceleration. 
                Get results quickly with our high-performance infrastructure.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle" style={{ animationDelay: '0.8s' }}>
                <GlobeAltIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Carbon-Aware Metrics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track environmental impact with carbon footprint calculations. 
                Make sustainable AI decisions with detailed energy consumption data.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl card-hover animate-scale-in">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <ShieldCheckIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Secure model storage with organization-based isolation. 
                Role-based access control and audit logging for teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse-slow"></div>
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4 animate-slide-up font-display">
            Ready to Compare Your Models?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-slide-up-delay">
            Join thousands of ML teams who trust ModelCompare for their model evaluation needs
          </p>
          <Link
            href="/get-started"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-gentle"
          >
            <CloudArrowUpIcon className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
            Get Started Now
          </Link>
        </div>
        
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-rotate-slow"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      </section>
    </div>
  );
}
