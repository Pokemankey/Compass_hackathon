import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';

function PredictionSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = Math.random() * 100;
      setSliderPosition(newPosition);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.predictionWrapper}>
      <div className={styles.team}>
        <span>Team 1</span>
        <span>{(100 - sliderPosition).toFixed(2)}%</span>
      </div>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          readOnly
          className={styles.slider}
          style={{ background: `linear-gradient(to right, black ${sliderPosition}%, rgb(216, 10, 121) ${sliderPosition}%)` }}
        />
      </div>
      <div className={styles.team}>
        <span>Team 2</span>
        <span>{sliderPosition.toFixed(2)}%</span>
      </div>
    </div>
  );
}

export default PredictionSlider;
