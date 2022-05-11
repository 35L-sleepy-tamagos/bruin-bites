import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VenueCard from "../components/VenueCard";
import venues from "../components/VenueData";

export default function Home() {
	return (
		<Container>
			<Row align="center">
				<h1 className="text-dark">Welcome to Bruin Bites!</h1>
			</Row>
			<Row align="center">
				{venues.map((venues) => {
					return (
						<Col className="col-4 my-3">
							<VenueCard className="p-0"
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
