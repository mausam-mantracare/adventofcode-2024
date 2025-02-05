function ResumableInterval(callback, delay) {
 
    let intervalId;
    let paused = false;
  
    const start = () => {
      if (!paused) {
        intervalId = setInterval(callback, delay);
      }
    };
  
    const pause = () => {
      clearInterval(intervalId);
      paused = true;
    };
  
    const resume = () => {
      if (paused) {
        intervalId = setInterval(callback, delay);
        paused = false;
      }
    };
    const stop = () => {
      clearInterval(intervalId);
    };
  
    return { start, pause, resume, stop };
  }