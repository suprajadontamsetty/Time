import { useState } from 'react';
import { useTimers } from '../context/TimerContext';
import { v4 as uuid } from 'uuid';

export default function TimerForm() {
  const { dispatch } = useTimers();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTimer = {
      id: uuid(),
      name,
      duration: +duration,
      remaining: +duration,
      category,
      status: 'Idle',
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });

    setName('');
    setDuration('');
    setCategory('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        ➕ Add New Timer
      </h2>

      <div className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="⏱ Timer Name"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white"
        />
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="⌛ Duration (sec)"
          type="number"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="📁 Category"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-full transition"
        >
          Add Timer
        </button>
      </div>
    </form>
  );
}
