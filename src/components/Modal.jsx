export default function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          {message}
        </h2>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
