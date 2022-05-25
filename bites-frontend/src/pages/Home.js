import React from "react";
import "../css/App.css";
import { Container, Row, Col } from "react-bootstrap";
import VenueCard from "../components/VenueCard";
import venues from "../components/VenueData";

export default function Home({ user }) {
  return (
    <Container>
      <Row align="center">
        <h1 className="fs-1">Welcome to Bruin Bites!</h1>
      </Row>
      <Row align="center">
        {venues.map((venues, i) => {
          return (
            <Col key={i} className="col-12 col-sm-6 col-lg-4 my-3">
              <VenueCard
                user={user?.uid}
                className="p-0"
                {...venues}
                alt="todo"
                key={venues.name}
              ></VenueCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
