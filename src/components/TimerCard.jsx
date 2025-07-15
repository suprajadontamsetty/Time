import { useEffect, useRef, useState } from 'react';
import { useTimers } from '../context/TimerContext';
import Modal from './Modal';

export default function TimerCard({ timer }) {
  const { dispatch } = useTimers();
  const [showModal, setShowModal] = useState(false);
  const [localRemaining, setLocalRemaining] = useState(timer.remaining);
  const intervalRef = useRef(null);

  const halfway = Math.floor(timer.duration / 2);

  useEffect(() => {
    if (localRemaining <= 0 && timer.status !== 'Completed') {
      clearInterval(intervalRef.current);
      dispatch({ type: 'MARK_COMPLETED', payload: timer });
      setShowModal(true);
    }
  }, [localRemaining]);

  useEffect(() => {
    setLocalRemaining(timer.remaining);
  }, [timer.remaining]);

  const handleStart = () => {
    if (timer.status === 'Running') return;

    dispatch({
      type: 'UPDATE_TIMER',
      payload: { id: timer.id, status: 'Running' },
    });

    intervalRef.current = setInterval(() => {
      setLocalRemaining(prev => {
        const updated = prev - 1;
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { id: timer.id, remaining: updated, status: 'Running' },
        });

        if (updated === halfway) {
          alert(`⏳ ${timer.name} is halfway done!`);
        }

        return updated;
      });
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    dispatch({ type: 'UPDATE_TIMER', payload: { id: timer.id, status: 'Paused' } });
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setLocalRemaining(timer.duration);
    dispatch({ type: 'RESET_TIMER', payload: timer.id });
  };

  const progress = (localRemaining / timer.duration) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {timer.name}
        </h3>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            timer.status === 'Running'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : timer.status === 'Paused'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              : timer.status === 'Completed'
              ? 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
          }`}
        >
          {timer.status}
        </span>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mb-4">
        ⏳ Remaining: <span className="font-medium">{localRemaining}s</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mt-2">
        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
        >
          ▶ Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full transition"
        >
          ❚❚ Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
        >
          ↺ Reset
        </button>
      </div>

      {/* Completion Modal */}
      <Modal
        isOpen={showModal}
        message={`🎉 ${timer.name} completed!`}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
