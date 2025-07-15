import { useTimers } from '../context/TimerContext';

export default function History() {
  const { state } = useTimers();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state.completedTimers, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timer-history.json';
    a.click();
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-tr from-pink-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">📜 Completed Timers History</h2>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleExport}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
          >
            ⬇️ Export as JSON
          </button>
        </div>

        {state.completedTimers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No timers completed yet.
          </p>
        ) : (
          <div className="space-y-4">
            {state.completedTimers.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium">{t.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Completed at {new Date(t.completedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
