import React, { useState, useEffect, useContext } from "react";
import activeContext from "../context/activeContext.js";
export default function Exercise({
  exercise,
  children,
  id,
  nextTimer,
  round,
  mode,
  activeTimerIndex,
}) {
  const [timer, setTimer] = useState(null);
  const [inRest, setInRest] = useState(false);
  const [remainingExerciseTime, setRemainingExerciseTime] = useState(
    exercise.exerciseTime
  );
  const [percentage, setPercentage] = useState(0);
  const { updateActiveExercise } = useContext(activeContext);

  useEffect(() => {
    if (remainingExerciseTime === 0) {
      if (inRest) {
        stopTimer();
        nextTimer();
      } else {
        setInRest(true);
      }
    }
  }, [remainingExerciseTime]);

  // issues
  useEffect(() => {
    if (inRest) {
      setRemainingExerciseTime(exercise.restTime);
    }
  }, [inRest, timer]);

  useEffect(() => {
    if (percentage !== 0 || activeTimerIndex === id) {
      updateActiveExercise({
        id,
        round,
        name: exercise.exerciseName,
        remainingExerciseTime,
        inRest,
        percentage,
      });
    }
  }, [percentage, activeTimerIndex]);

  const startTimer = (t = remainingExerciseTime) => {
    let timeLeft = t;
    let localInRest = inRest;
    if (!timer) {
      const t = setInterval(() => {
        if (timeLeft === 0) {
          timeLeft = exercise.restTime;
          localInRest = true;
        }
        timeLeft = timeLeft - 1;
        setPercentage(
          Math.round(
            ((localInRest
              ? exercise.exerciseTime + exercise.restTime - timeLeft
              : exercise.exerciseTime - timeLeft) /
              (exercise.exerciseTime + exercise.restTime)) *
              100
          )
        );

        setRemainingExerciseTime(timeLeft);
      }, 1000);

      setTimer(t);
    }
  };

  const resetTimer = (time = exercise.exerciseTime) => {
    setRemainingExerciseTime(time);
    setInRest(false);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  return children({
    id,
    startTimer,
    stopTimer,
    resetTimer,
    remainingExerciseTime,
    id,
    inRest,
    percentage,
  });
}
