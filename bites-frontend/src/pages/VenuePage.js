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
                    { name }
                </h1>
                <Image src={ img } alt={ name }
                    className="col-md-4 offset-md-4 mt-3"
                />
                <Button variant="secondary" size="lg" className="col-md-8 offset-md-2 mt-3"
                    onClick={() => recordDining()}
                >
                    I ate here!
                </Button>
                <iframe 
                    title="menu" 
                    src={menuLink}
                    width="100%"
                    height="750"
                    className="mt-5"
                />
                <h1 className="mt-3">
                    Reviews!
                </h1>
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