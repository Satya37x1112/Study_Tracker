import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTasksChange }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false
      };
      onTasksChange([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    onTasksChange(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    onTasksChange(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
        Today's Tasks
      </h2>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new study task..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                task.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {task.completed && <Check size={12} />}
              </button>
              
              <span className={`flex-1 transition-all duration-200 ${
                task.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-700'
              }`}>
                {task.text}
              </span>
              
              <button
                onClick={() => removeTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;