import { useState } from 'react';
import TimerForm from '../components/TimerForm';
import CategorySection from '../components/CategorySection';
import { useTimers } from '../context/TimerContext';

export default function Home() {
  const { state } = useTimers();

  // Get unique categories
  const categories = [...new Set(state.timers.map(t => t.category))];

  // Filter logic
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredTimers = state.timers.filter(t =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  // Group timers
  const grouped = filteredTimers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-tr from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          ⏱️ Timer Manager
        </h1>

        {/* Timer Form */}
        <div className="mb-10">
          <TimerForm />
        </div>

        {/* Filter Dropdown */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <label className="font-medium text-gray-700 dark:text-gray-200 text-lg">
            Filter by Category:
          </label>
          <select
            id="category-filter"
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Timer Categories */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, timers]) => (
            <CategorySection key={category} category={category} timers={timers} />
          ))}
        </div>
      </div>
    </div>
  );
}
