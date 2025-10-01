import React from "react";
import { Zap } from "lucide-react";

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Contentify AI
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          AI-Powered Social Media Creation
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;