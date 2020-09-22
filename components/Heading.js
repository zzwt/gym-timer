import React, { useContext } from "react";
import { Menu, Header, Progress, Container } from "semantic-ui-react";
import activeContext from "../context/activeContext";

export default function Heading({ activeStatus }) {
  const { snapshot } = useContext(activeContext);

  return (
    <Menu fixed="top" inverted color="green" vertical fluid>
      <Container
        text
        textAlign="center"
        fluid
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Header inverted as="h2">
          {snapshot
            ? `Current Round: ${snapshot.round}`
            : "Please setup exercise plan and start timing."}
        </Header>
        <Header inverted as="h4">
          {snapshot ? `Current Exercise: ${snapshot.name}` : ""}
        </Header>
      </Container>

      <Progress
        percent={(snapshot && snapshot.percentage) || 0}
        warning
        style={{ marginBottom: 0 }}
        size="small"
      ></Progress>
    </Menu>
  );
}
