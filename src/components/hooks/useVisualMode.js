import { useState } from 'react';

// Custom hook to manage our Appointment Component mode state
export default function useVisualMode(initialMode) {
  // State that hold our current state as well as the history of mode state changes
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // Function to transition from one state to the next
  const transition = (newMode, replace=false) => {
    const newHistory = [...history];
    
    // If true, remove the last state before adding the next state to the stack
    if (replace) {
      newHistory.pop();
    }

    // Add the new mode state to the stack
    newHistory.push(newMode);

    // Update the state with React
    setHistory(newHistory);
    setMode(newMode);
  };

  // Function to transition to the previous state
  const back = () => {
    // Don't attempt to go transition back if we're at the beginning of the stack
    if (history.length > 1) {
      // Make a copy of the history, pop the last mode off the stack and update the index
      const newHistory = [...history];
      newHistory.pop();
      const lastIndex = newHistory.length - 1;

      // Update the state with React
      setMode(newHistory[lastIndex]);
      setHistory(newHistory);
    }
  };

  // Return the mode state and functions to be used in our Appointment components
  return {
    mode,
    transition,
    back
  };
}