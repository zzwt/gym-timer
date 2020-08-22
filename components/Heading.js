import React from "react";
import { Menu, Header, Progress, Container } from "semantic-ui-react";

export default function Heading() {
  return (
    <Menu fixed="top" inverted color="green" vertical fluid>
      <Container
        text
        textAlign="center"
        fluid
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Header inverted as="h2">
          Gym Timer
        </Header>
      </Container>

      <Progress
        percent={1}
        warning
        style={{ marginBottom: 0 }}
        size="small"
      ></Progress>
    </Menu>
  );
}
