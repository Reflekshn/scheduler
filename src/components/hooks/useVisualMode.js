import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace=false) => {
    const newHistory = [...history];
    
    if (replace) {
      newHistory.pop();
    }

    newHistory.push(newMode);

    setHistory(newHistory);
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      
      const lastIndex = newHistory.length - 1;
      setMode(newHistory[lastIndex]);
      setHistory(newHistory);
    }
  };

  return {
    mode,
    transition,
    back
  };
}