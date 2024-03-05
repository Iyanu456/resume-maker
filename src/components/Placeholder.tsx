import { useState, useEffect } from 'react';

const A4AspectRatio = 1.414; // Aspect ratio of A4 paper
interface scale {
    scaleFactor: number;
}
const ResizableDiv = (props: scale) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scale = 2.738 / props.scaleFactor
  const calculateProportionalSize = () => {
    // Calculate the proportional height based on the current width and A4 aspect ratio
    const scaledHeight = windowSize.width / A4AspectRatio;

    // Ensure the proportional height fits within the window heigt

    return {
      height: (scaledHeight * A4AspectRatio) / scale,
      width: (scaledHeight) / scale,
    };
  };

  const proportionalSize = calculateProportionalSize();

  return (
    <div style={{ width: proportionalSize.width, height: proportionalSize.height, backgroundColor: 'white' }}>
      {/* Your content goes here */}
    </div>
  );
};

export default ResizableDiv;