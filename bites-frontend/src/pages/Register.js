import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { emailRegister, googleSignIn } from "../components/firebaseConfig/utils";

function Register() {

	let navigate = useNavigate();

	/* stateful variables */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	/* readibility/utility function */
	const register = (name, email, password) => {
		emailRegister(name, email, password);
		navigate("/");
	};

	return (
		<Container>
			<Row className="mb-3">
				<Col>
					<h1>Register for an Account!</h1>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col className="col-12 col-md-6">
				<Card className="p-3">
				<Card.Body className="text-center">
					<Form className="mb-3">
					<Form.Group className="mb-3">
					<Form.Control type="text" className="signin-input"
						value={ name } onChange={ (e) => setName(e.target.value) }
						placeholder="Input your Name" 
					/>
					</Form.Group>
					<Form.Group className="mb-3">
					<Form.Control
						type="text" className="signin-input"
						value={ email } onChange={ (e) => setEmail(e.target.value) }
						placeholder="Input your Email" 
					/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="password" className="signin-input"
							value={ password } onChange={ (e) => setPassword(e.target.value) }
							placeholder="Input your Password" 
						/>
					</Form.Group>
					<Form.Group className="d-grid mb-3">
						<Button className=""
							variant="primary"
							size="lg"
							onClick={ () => register(name, email, password)}>
							Register Now!
						</Button>
					</Form.Group>
					<Form.Group className="d-grid">
						<Button className=""
							variant="danger"
							size="lg"
							onClick={ () => googleSignIn() }>
							Register with Google!
						</Button>
					</Form.Group>
					</Form>
					<Link to="/signin">Already Have an Account? Sign In Here!</Link>
				</Card.Body>
				</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Register;
