import React from "react";
import { Card, Header } from "semantic-ui-react";
import Exercise from "./Exercise";
export default function ExercisePlan({ exercises, removeExercise }) {
  const renderPlan = () => {
    return Object.entries(exercises).map(([key, value]) => {
      return {
        key,
        header: <Header content={`Round - ${key}`} textAlign="center" />,
        fluid: true,
        description: (
          <Card.Group itemsPerRow="3" stackable>
            {value.map((exercise, index) => (
              <Exercise
                key={index}
                exercise={exercise}
                onDelete={() => {
                  removeExercise(key, index);
                }}
              />
            ))}
          </Card.Group>
        ),
      };
    });
  };

  return (
    <div>
      <Card.Group centered items={renderPlan()} />
    </div>
  );
}
