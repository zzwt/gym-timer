import React, { useState } from "react";
import { Card, Header, Button } from "semantic-ui-react";
import Exercise from "./Exercise";
import status from "../status";

export default function ExercisePlan({ exercises, removeExercise }) {
  const [mode, setMode] = useState(status.START);
  // const [timer, setTimer] = useState(null);
  //const [timers, setTimers] = useState([]);
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
                  exercise={exercise}
                  id={timerIndex++}
                  nextTimer={nextTimer}
                  mode={mode}
                  // onDelete={}
                  // disabled={}
                >
                  {(snapshot) => {
                    console.log("shanpshotting, timers is ", timers);
                    if (!timers[snapshot.id]) {
                      timers.push(snapshot);
                      // setTimers([...timers]);
                    }
                    //  else {
                    //   // timers[snapshot.id] = snapshot;
                    //   // setTimers([...timers]);
                    //   timers.splice(snapshot.id, 1, snapshot);
                    // }
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
        // const timer = setInterval(() => {
        //   console.log("exercising");
        // }, 1000);
        // setTimer(timer);
        const index = 0;
        setActiveTimerIndex(index);
        timers[index].startTimer();
        setMode(status.EXERCISING);
      } else if (mode === status.EXERCISING) {
        // clearInterval(timer);
        // setTimer(null);
        setMode(status.STOPPED);
        timers[activeTimerIndex].stopTimer();
      } else if (mode === status.STOPPED) {
        // const timer = setInterval(() => {
        //   console.log("exercising");
        // }, 1000);
        // setTimer(timer);
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
