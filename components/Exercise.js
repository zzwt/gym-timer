import React, { useState, useEffect } from "react";
import { Card, Header, Button } from "semantic-ui-react";
import status from "../status";
export default function Exercise({ exercise, children, id, nextTimer, mode }) {
  const [timer, setTimer] = useState(null);
  const [inRest, setInRest] = useState(false);
  const [remainingExerciseTime, setRemainingExerciseTime] = useState(
    exercise.exerciseTime
  );

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
  // useEffect(() => {
  //   console.log(inRest, timer, "in use effect");
  //   if (inRest) {
  //     resetTimer(exercise.restTime);
  //     // startTimer(exercise.restTime);
  //   }
  // }, [inRest, timer]);

  const startTimer = (t = remainingExerciseTime) => {
    let timeLeft = t;
    console.log("toggle timer left time", timeLeft);
    console.log("timer is", timer);
    if (!timer) {
      const t = setInterval(() => {
        if (timeLeft === 0) {
          timeLeft = exercise.restTime;
        }
        timeLeft = timeLeft - 1;

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
    console.log("instop timer", timer);
    if (timer) {
      console.log("clearing interval");
      clearInterval(timer);
      setTimer(null);
    }
  };

  return children({
    startTimer,
    stopTimer,
    resetTimer,
    remainingExerciseTime,
    id,
    inRest,
  });
  // <Card>
  //   <Card.Content textAlign="center">
  //     <Card.Header content={exerciseName}></Card.Header>

  //     <Card.Description>
  //       {`Exercise Time: ${exerciseTime}s Rest Time: ${restTime}s`}
  //     </Card.Description>
  //     <Button
  //       icon="trash alternate outline"
  //       onClick={onDelete}
  //       content="Remove"
  //       color="orange"
  //       disabled={disabled}
  //     />
  //   </Card.Content>
  // </Card>
}
