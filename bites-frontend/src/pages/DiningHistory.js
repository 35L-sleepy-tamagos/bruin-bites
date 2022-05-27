import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebaseConfig/firebase";
import {
    logout,
    getUsers,
    getReviews,
    createReview,
    getUserReviews,
    getUserMeals,
} from "../components/firebaseConfig/utils.js";
import { Row, Col } from "react-bootstrap";
import { Container, Image, Stack, Button } from "react-bootstrap";

export default function DiningHistory() {
    const navigate = useNavigate();
    const [reviews, setReviews] = React.useState([]);
    const [meals, setMeals] = React.useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [userImage, setUserImage] = useState();
    /* get user details */
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            console.log("no user");
            return;
        }
        console.log("getting userdata");
        getUsers(user.uid).then((userDetails) => {
            setUserDetails(userDetails);
        });
    }, []);

    /* get dining history */
    useEffect(() => {
        if (userDetails.length == 0) {
          return;
        }
        getUserMeals(userDetails.uid).then((meals) => {
          setMeals(meals);
        });
    }, [userDetails]);

    const goToProfile = () => {
        navigate("/profile");
    }

    return (
        <Container className="px-0 text-dark">
            <Col>
                <h1 className="fs-1">Dining History</h1>
            </Col>

            <Row className="py-5 mx-0 bg-light">
                <Col className="mt-3">
                    {/*add formatting here plz*/}
                    {meals.map((meal, i) => 
                    {
                        return (
                            <Col key={i} className="px-0 col-12 gy-3">
                                <h4>{`${meal.location}`}</h4>
                                <p>{`${meal.createdAt}`}</p>
                            </Col>
                        );
                    })}
                </Col>
            </Row>
            <Row>
                <Col className="mx-0 my-5 d-grid gap-2">
                    <Button
                        variant="primary"
                        className="btn"
                        size="lg"
                        onClick={() => goToProfile()}
                    >
                        Return to your Profile!
                    </Button>

                </Col>
            </Row>
        </Container>
    )
}