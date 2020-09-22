import React, { useState, useContext } from "react";
import { Card, Header, Button } from "semantic-ui-react";
import Exercise from "./Exercise";
import status from "../status";

export default function ExercisePlan({ exercises, removeExercise }) {
  const [mode, setMode] = useState(status.START);
  const [activeTimerIndex, setActiveTimerIndex] = useState(null);

  let timers = [];

  const nextTimer = () => {
    const index = activeTimerIndex + 1;
    setActiveTimerIndex(index);
    if (timers[index] && index < timers.length) {
      timers[index].startTimer();
    } else {
      setActiveTimerIndex(null);
      setMode(status.START);
      timers.forEach((timer) => {
        timer.resetTimer();
      });
    }
  };

  const renderPlan = () => {
    let timerIndex = 0;
    return Object.entries(exercises).map(([key, value]) => {
      return {
        key,
        header: <Header content={`Round - ${key}`} textAlign="center" />,
        fluid: true,
        description: (
          <Card.Group itemsPerRow="3" stackable>
            {value.map((exercise, index) => {
              const { exerciseName, exerciseTime, restTime } = exercise;
              return (
                <Exercise
                  key={index}
                  round={key}
                  activeTimerIndex={activeTimerIndex}
                  exercise={exercise}
                  id={timerIndex++}
                  nextTimer={nextTimer}
                  mode={mode}
                >
                  {(snapshot) => {
                    if (
                      mode !== status.START &&
                      activeTimerIndex === snapshot.id
                    ) {
                    }
                    if (!timers[snapshot.id]) {
                      timers.push(snapshot);
                    }
                    return (
                      <Card>
                        <Card.Content textAlign="center">
                          <Card.Header content={exerciseName}></Card.Header>

                          <Card.Description>
                            {snapshot.inRest
                              ? `In Rest: ${snapshot.remainingExerciseTime}`
                              : `In Exercise: ${snapshot.remainingExerciseTime}`}
                            {/* {`Exercise Time: ${exerciseTime}s Rest Time: ${restTime}s`} */}
                          </Card.Description>
                          <Button
                            icon="trash alternate outline"
                            onClick={() => {
                              removeExercise(key, index);
                            }}
                            content="Remove"
                            color="orange"
                            disabled={mode !== status.START}
                          />
                        </Card.Content>
                      </Card>
                    );
                  }}
                </Exercise>
              );
            })}
          </Card.Group>
        ),
      };
    });
  };

  const toggleExercise = () => {
    if (timers.length > 0) {
      if (mode === status.START) {
        const index = 0;
        setActiveTimerIndex(index);
        setMode(status.EXERCISING);
        timers[index].startTimer();
      } else if (mode === status.EXERCISING) {
        setMode(status.STOPPED);
        timers[activeTimerIndex].stopTimer();
      } else if (mode === status.STOPPED) {
        timers[activeTimerIndex].startTimer();
        setMode(status.EXERCISING);
      }
    }
  };

  const stopExercise = () => {
    // if (timer) {
    //   clearInterval(timer);
    //   setTimer(null);
    // }
    if (mode !== status.START) {
      timers.forEach((timer) => {
        timer.stopTimer();
        timer.resetTimer();
      });
      setMode(status.START);
    }
  };

  return (
    <div>
      <Card.Group centered items={renderPlan()} />
      <Button
        // color="#009688"
        icon={mode === status.EXERCISING ? "pause" : "play"}
        fluid
        style={{ marginTop: "16px", backgroundColor: "#66BB6A" }}
        content={
          mode === status.START
            ? "Start"
            : mode === status.STOPPED
            ? "Resume"
            : "Pause"
        }
        onClick={toggleExercise}
      />
      <Button
        // color="#009688"
        icon="refresh"
        fluid
        color="blue"
        style={{ marginTop: "16px" }}
        content="Reset"
        disabled={mode === status.START}
        onClick={stopExercise}
      />
    </div>
  );
}
