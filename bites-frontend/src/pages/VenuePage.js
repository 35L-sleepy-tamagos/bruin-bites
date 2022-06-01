import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import { getHallReviews, createDining } from "../components/firebaseConfig/utils";

import ReviewCard from "../components/ReviewCard";


function VenuePage({ diningData, user }) {

    /* reviews */
    const [reviews, setReviews] = useState([]);

    const name = diningData.name;
    const menuLink = diningData.link;
    const img = diningData.image;

    /* initial getting of reviews */
    useEffect(() => {
        getHallReviews(name).then((reviews) => {
            setReviews(reviews);
        });
    }, []);

    /* utility */
    const recordDining = () => {
        createDining(name, user.uid);
        alert(`${name} added to your Dining History!`)
    }

    return (
        <Container className="col-md-8 offset-md-2 mt-3">
            <Col>
                <h1>
                    { name } Menu
                </h1>
                <div class="embedded_menu">
                <iframe 
                    title="menu" 
                    src={menuLink}
                    width="100%"
                    /*changed height of embedded menu*/
                    height="500"
                    /*changed class names for margin spacing*/
                    className="py-2"
                />
                </div>
                <Row className="py-2">
                <Button variant="secondary" size="lg" className="col-md-8 offset-md-2 mt-3"
                    onClick={() => recordDining()}
                >
                    I ate here!
                </Button>
                </Row>
                <Row className="mt-5">
                <h1>
                    Reviews for { name }
                </h1>
                </Row>
                <Row className="py-2">
                    {[...reviews].reverse().map((review, i) => {
                        return (
                        <Col key={i} className="px-0 col-12 gy-3">
                            <ReviewCard
                            review_header={review.title}
                            review_text={review.body}
                            review_rating={review.rating}
                            review_sender={review.user}
                            review_dining={review.diningHall}
                            review_time={review.createdAt}
                            />
                        </Col>
                        );
                    })}
                </Row>
            </Col>   
        </Container>
    )    
}

export default VenuePage;