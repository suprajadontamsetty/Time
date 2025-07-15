import { createContext, useContext, useReducer, useEffect } from 'react';

const TimerContext = createContext();

const initialState = {
  timers: [],
  completedTimers: [],
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map(t =>
          t.id === action.payload ? { ...t, remaining: t.duration, status: 'Idle' } : t
        ),
      };
    case 'MARK_COMPLETED':
      return {
        ...state,
        completedTimers: [
          ...state.completedTimers,
          { ...action.payload, completedAt: new Date().toISOString() },
        ],
        timers: state.timers.map(t =>
          t.id === action.payload.id ? { ...t, status: 'Completed', remaining: 0 } : t
        ),
      };
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const data = localStorage.getItem('timerData');
    if (data) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timerData', JSON.stringify(state));
  }, [state]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimers = () => useContext(TimerContext);
