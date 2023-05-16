/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    let isMobile = false;
    let isLandscape = false;
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    }
    if (window.matchMedia('(orientation: landscape)').matches) {
      // you're in LANDSCAPE mode
      isLandscape = true;
    }
    return {
      width,
      height,
      isMobile,
      isLandscape,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [getWindowDimensions, hasWindow]);

  return windowDimensions;
};

export default useWindowDimensions;
