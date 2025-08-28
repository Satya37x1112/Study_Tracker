import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import StudyTimer from './components/StudyTimer';
import ProgressSummary from './components/ProgressSummary';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const motivationalQuotes = [
  "Small steps every day lead to big results",
  "The expert in anything was once a beginner",
  "Success is the sum of small efforts repeated day in and day out",
  "Don't watch the clock; do what it does. Keep going",
  "The only way to do great work is to love what you do",
  "Your limitation—it's only your imagination",
  "Education is the most powerful weapon you can use to change the world"
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [currentQuote] = useState(() => 
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  // Load data from localStorage on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedTasks = localStorage.getItem(`tasks-${today}`);
    const savedTime = localStorage.getItem(`studyTime-${today}`);

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedTime) {
      setTotalStudyTime(parseInt(savedTime, 10));
    }
  }, []);

  // Save data to localStorage whenever tasks or study time changes
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`tasks-${today}`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`studyTime-${today}`, totalStudyTime.toString());
  }, [totalStudyTime]);

  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const handleTimeUpdate = (newTime: number) => {
    setTotalStudyTime(newTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              StudyTracker
            </h1>
            <p className="text-gray-600 italic text-sm md:text-base max-w-2xl mx-auto">
              "{currentQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-1">
            <TaskList tasks={tasks} onTasksChange={handleTasksChange} />
          </div>

          {/* Timer Section */}
          <div className="lg:col-span-1">
            <StudyTimer onTimeUpdate={handleTimeUpdate} />
          </div>

          {/* Progress Section */}
          <div className="lg:col-span-1">
            <ProgressSummary tasks={tasks} totalStudyTime={totalStudyTime} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Stay focused, stay consistent. You've got this! 🌟</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;