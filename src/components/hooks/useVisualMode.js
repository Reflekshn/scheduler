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


// function useControlledInput(initial) {
//   const [value, setValue] = useState(initial);

//   return {
//     value,
//     onChange: (event) => setValue(event.target.value)
//   };
// }


// import { useEffect } from "react";

// export default function useDebounce(operation, ms) {
//   useEffect(() => {
//     const handle = setTimeout(operation, ms);
//     return () => clearTimeout(handle);
//   }, [operation, ms]);
// }