import { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Header, Form, Dropdown, Button } from "semantic-ui-react";
import ExercisePlan from "../components/ExercisePlan";
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
    });
    const newExercises = { ...exercises, [round]: exercisesInRound };
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header as="h2" textAlign="center">
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
            color="teal"
            fluid
            onClick={addExercise}
            style={{ marginBottom: "16px" }}
          ></Button>
          <ExercisePlan exercises={exercises} removeExercise={removeExercise} />
        </Form>
      </Container>
    </div>
  );
}
