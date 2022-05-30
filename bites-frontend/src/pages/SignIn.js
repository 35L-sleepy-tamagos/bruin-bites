import "../css/App.css";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../components/firebaseConfig/firebase";
import { emailSignIn, googleSignIn } from "../components/firebaseConfig/utils";

function SignIn() {

    /* navigation to profile page if user is signed in */
    let navigate = useNavigate();

    const user = auth.currentUser;
    if (user) {
        navigate("/profile");
    }

    /* stateful variables */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* once someone signs in, redirect them */
    function emailRedir(email, password) {
        emailSignIn(email, password);
        navigate("/");
    }

    function googleRedir(email, password) {
        googleSignIn(email, password);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h1>Sign-In to View Your Profile!</h1>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col className="col-12 col-md-6">
                    <Card className="p-3">
                        <Card.Body className="text-center">
                            <Form className="mb-3">
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        className="signin-input"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Input your Email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        className="signin-input"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Input your Password"
                                    />
                                </Form.Group>
                                <Form.Group className="d-grid mb-3">
                                    <Button
                                        className=""
                                        variant="primary"
                                        size="lg"
                                        onClick={() =>
                                            emailRedir(email, password)
                                        }
                                    >
                                        Sign In!
                                    </Button>
                                </Form.Group>
                                <Form.Group className="d-grid">
                                    <Button
                                        className=""
                                        variant="danger"
                                        size="lg"
                                        onClick={() => googleRedir()}
                                    >
                                        Sign In with Google!
                                    </Button>
                                </Form.Group>
                            </Form>
                            <Link to="/register">Create an Account!</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SignIn;
