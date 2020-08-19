import React from "react";
import { Card, Header, Button } from "semantic-ui-react";

export default function Exercise({ exercise, onDelete }) {
  const { exerciseName, exerciseTime, restTime } = exercise;
  return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header content={exerciseName}></Card.Header>

        <Card.Description>
          {`Exercise Time: ${exerciseTime}s Rest Time: ${restTime}s`}
        </Card.Description>
        <Button onClick={onDelete} content="Remove" color="orange" />
      </Card.Content>
    </Card>
  );
}
