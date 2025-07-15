import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 dark:text-blue-400 underline' : ''
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 dark:text-blue-400 underline' : ''
            }
          >
            History
          </NavLink>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggle}
          className="bg-gray-200 dark:bg-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Switch to {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </nav>

      {/* Routes */}
      <main className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}
