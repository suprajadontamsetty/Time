import { useTimers } from '../context/TimerContext';
import TimerCard from './TimerCard';

export default function CategorySection({ category, timers }) {
  const { dispatch } = useTimers();

  const bulkAction = (type) => {
    timers.forEach(timer => {
      if (type === 'RESET') {
        dispatch({ type: 'RESET_TIMER', payload: timer.id });
      } else {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { id: timer.id, status: type },
        });
      }
    });
  };

  return (
    <div className="mb-10">
      {/* Category Header & Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          📂 {category}
        </h2>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => bulkAction('Running')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full shadow transition"
          >
            ▶ Start All
          </button>
          <button
            onClick={() => bulkAction('Paused')}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full shadow transition"
          >
            ❚❚ Pause All
          </button>
          <button
            onClick={() => bulkAction('RESET')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow transition"
          >
            ↺ Reset All
          </button>
        </div>
      </div>

      {/* Timer Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {timers.map(timer => (
          <TimerCard key={timer.id} timer={timer} />
        ))}
      </div>
    </div>
  );
}
