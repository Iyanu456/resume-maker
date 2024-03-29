import React, { useState, useEffect, useContext, createContext } from 'react';

// Define the type for the scale context
type ScaleContextType = {
  scaleFactor: number;
  setScaleFactor: (factor: number) => void;
};

// Create the context
const ScaleContext = createContext<ScaleContextType>({
  scaleFactor: 1,
  setScaleFactor: () => {},
});

// Custom hook to use the context value
const useScaleFactor = () => useContext(ScaleContext);

// Provider component to manage the scale factor
const ScaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    function updateScaleFactor() {
      const width = window.innerWidth;
      const scaleFactorRatio = window.innerWidth > 1080 ? 210 / 1400 : 210 / 1600 // Calculate the ratio for 1303px width
      const scaleFactor = scaleFactorRatio * width / 210; // Calculate the scale factor
      setScaleFactor(Math.min(scaleFactor, 210 / 210)); // Limit to maximum width of 210mm
    }

    updateScaleFactor();

    window.addEventListener('resize', updateScaleFactor);
    return () => window.removeEventListener('resize', updateScaleFactor);
  }, []);

  return (
    <ScaleContext.Provider value={{ scaleFactor, setScaleFactor }}>
      {children}
    </ScaleContext.Provider>
  );
};

export { ScaleProvider, useScaleFactor };
