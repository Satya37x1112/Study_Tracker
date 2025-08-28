import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface StudyTimerProps {
  onTimeUpdate: (totalSeconds: number) => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
    onTimeUpdate(0);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center h-fit">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
        Study Timer
      </h2>
      
      <div className="mb-8">
        <div className={`text-5xl md:text-6xl font-light mb-2 transition-colors duration-300 ${
          isRunning ? 'text-green-600' : 'text-gray-600'
        }`}>
          {formatTime(seconds)}
        </div>
        <div className="text-sm text-gray-400 font-medium">
          {isRunning ? 'Studying...' : 'Ready to focus'}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={start}
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
          >
            <Play size={24} className="ml-1" />
          </button>
        ) : (
          <button
            onClick={pause}
            className="flex items-center justify-center w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            <Pause size={24} />
          </button>
        )}
        
        <button
          onClick={reset}
          className="flex items-center justify-center w-14 h-14 bg-gray-400 hover:bg-gray-500 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
        >
          <Square size={20} />
        </button>
      </div>
      
      {seconds > 0 && (
        <div className="mt-6 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            Great work! Keep it up! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyTimer;