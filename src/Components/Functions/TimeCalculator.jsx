import { useState, useEffect } from "react";

const TimeCalculator = ({ JoiningDate }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const startDate = new Date(JoiningDate);
      const currentDate = new Date();
      const difference = currentDate - startDate;
      setElapsedTime(Math.floor(difference / 1000)); // Convert milliseconds to seconds
    };

    // Calculate time elapsed initially
    calculateTimeElapsed();

    // Update time elapsed every second
    const intervalId = setInterval(calculateTimeElapsed, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Convert seconds to years, months, days, hours, minutes, and remaining seconds
  const years = Math.floor(elapsedTime / (365 * 24 * 60 * 60));
  const months = Math.floor((elapsedTime % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)); // Approximating a month to 30 days
  const days = Math.floor((elapsedTime % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((elapsedTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);
  const seconds = elapsedTime % 60;

  return `${years}Y ${months}M ${hours}H ${minutes}M ${seconds}S`;
};

export default TimeCalculator;
