import { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Header, Form, Dropdown, Button } from "semantic-ui-react";
import ExercisePlan from "../components/ExercisePlan";
import Heading from "../components/Heading";
import status from "../status";

const exerciseNames = [
  "Crunches",
  "Toe Taps with Jumps",
  "Jumping Jacks",
  "Burpees",
  "Froggy Jumps",
  "Front Kick Lunge",
  "Jog in Place",
  "Jog with High Knees",
  "Lunges",
  "Mountain Climbers",
  "Plank",
  "Plyo Lunges",
  "Plyo Jacks",
  "Prisoner Squat Jumps",
  "Push ups",
  "Reverse Crunches",
  "Russian twists",
  "Side to Side Jumping Lunges",
  "Squat Jumps",
  "Squats",
];

const generateExerciseNames = () =>
  exerciseNames.map((x, index) => ({
    key: index,
    text: x,
    value: x,
  }));

const generateExerciseTime = (firstItem, count, interval) => {
  let series = [];
  for (let i = 0; i < count; i++) {
    series.push(firstItem + i * interval);
  }

  return series.map((x, index) => ({
    key: index,
    text: `${x} seconds`,
    value: x,
  }));
};

const generateRounds = (rounds) => {
  return [...Array(rounds).keys()].map((x, index) => ({
    key: index,
    text: `Round ${x + 1} `,
    value: x + 1,
  }));
};

export default function Home() {
  const [exerciseName, setExerciseName] = useState("Crunches");
  const [exerciseTime, setExerciseTime] = useState(5);
  const [restTime, setRestTime] = useState(5);
  const [round, setRound] = useState(1);
  const [exercises, setExercises] = useState({});
  const [activeStatus, setActiveStatus] = useState(null);

  useEffect(() => {
    const loadedExercises = localStorage.getItem("exercises");
    if (loadedExercises)
      setExercises(JSON.parse(localStorage.getItem("exercises")));
  }, []);

  const removeExercise = (round, index) => {
    if (!exercises[round]) return;
    exercises[round].splice(index, 1);
    if (exercises[round].length === 0) delete exercises[round];
    const newExercises = { ...exercises };
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  const onExerciseNameChange = (_, data) => {
    setExerciseName(data.value);
  };

  const onExerciseTimeChange = (_, data) => {
    setExerciseTime(data.value);
  };

  const onRestTimeChange = (_, data) => {
    setRestTime(data.value);
  };

  const onRoundChange = (_, data) => {
    setRound(data.value);
  };

  const addExercise = () => {
    const exercisesInRound = exercises[round] ? exercises[round] : [];
    exercisesInRound.push({
      exerciseName,
      exerciseTime,
      restTime,
      elapsedExerciseTime: 0,
      elapsedRestTime: 0,
    });
    const newExercises = { ...exercises, [round]: exercisesInRound };
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  const updateSnapshot = ({
    round,
    name,
    exerciseTime,
    restTime,
    inRest,
    exercisePct,
    remaining,
    percentage,
  }) => {
    console.log(
      `snapshot: round: ${round}, name: ${name}, exerciseTime: ${exerciseTime},restTime: ${restTime}, inRest: ${inRest}, exercisePct: ${exercisePct},remaining: ${remaining}, percentage: ${percentage}
      `
    );
  };

  return (
    <div>
      <Head>
        <title>Gym Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading></Heading>
        <Header as="h2" textAlign="center" style={{ marginTop: "80px" }}>
          Create Your Timer
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Dropdown
              label={`Exercise: ${exerciseName}`}
              placeholder="Select Exercise"
              defaultValue={exerciseName}
              selection
              search
              options={generateExerciseNames()}
              onChange={onExerciseNameChange}
            />
            <Form.Dropdown
              label={`Exercise Time: ${exerciseTime} seconds`}
              placeholder="Select Exercise Time"
              selection
              defaultValue={exerciseTime}
              options={generateExerciseTime(5, 19, 5)}
              onChange={onExerciseTimeChange}
            />
            <Form.Dropdown
              label={`Rest Time: ${restTime} seconds`}
              placeholder="Select Rest Time"
              selection
              defaultValue={restTime}
              options={generateExerciseTime(5, 19, 5)}
              onChange={onRestTimeChange}
            />
            <Form.Dropdown
              label={`Add to Round: ${round}`}
              placeholder="Select Destination Round"
              selection
              defaultValue={round}
              options={generateRounds(10)}
              onChange={onRoundChange}
            />
          </Form.Group>
          <Button
            content={`Add Exercise to Round ${round}`}
            color="green"
            fluid
            onClick={addExercise}
            style={{
              marginBottom: "16px",
            }}
          ></Button>
          <ExercisePlan
            exercises={exercises}
            removeExercise={removeExercise}
            updateSnapshot={updateSnapshot}
          />
        </Form>
      </Container>
    </div>
  );
}
