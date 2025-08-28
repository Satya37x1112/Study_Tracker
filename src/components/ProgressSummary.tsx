import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface ProgressSummaryProps {
  tasks: Task[];
  totalStudyTime: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({ tasks, totalStudyTime }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    }
    return '0m';
  };

  const getMotivationalMessage = () => {
    if (completionPercentage === 100 && tasks.length > 0) {
      return "Perfect! All tasks completed! 🎉";
    } else if (completionPercentage >= 75) {
      return "Excellent progress! Almost there! 💪";
    } else if (completionPercentage >= 50) {
      return "Great work! Keep it going! 🌟";
    } else if (completionPercentage > 0 || totalStudyTime > 0) {
      return "Good start! Every step counts! 🚀";
    }
    return "Ready to begin your study session! 📚";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
        Progress Summary
      </h2>

      <div className="space-y-6">
        {/* Study Time Card */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-blue-700">
              <Clock size={18} className="mr-2" />
              <span className="font-medium">Study Time Today</span>
            </div>
          </div>
          <div className="text-2xl font-semibold text-blue-800">
            {formatTime(totalStudyTime)}
          </div>
        </div>

        {/* Tasks Completion Card */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-green-700">
              <Target size={18} className="mr-2" />
              <span className="font-medium">Tasks Completed</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold text-green-800">
              {completedTasks}/{tasks.length}
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-green-800">
                {completionPercentage}%
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {tasks.length > 0 && (
            <div className="mt-3">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="flex items-center text-purple-700 mb-2">
            <TrendingUp size={18} className="mr-2" />
            <span className="font-medium">Motivation</span>
          </div>
          <p className="text-sm text-purple-800 leading-relaxed">
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-lg font-semibold text-gray-700">
              {totalStudyTime > 0 ? Math.round(totalStudyTime / 60) : 0}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Total Minutes
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-lg font-semibold text-gray-700">
              {tasks.length}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Total Tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;