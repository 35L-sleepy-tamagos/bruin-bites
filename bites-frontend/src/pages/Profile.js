import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Container, Image, Stack, Button } from "react-bootstrap";

import ProfileImage from "../assets/placeholder.jpg";
import {} from "../components/ProfileComponents.js";
import ReviewCard from "../components/ReviewCard.js";
import {
    logout,
    getUsers,
    getReviews,
    createReview,
    getUserReviews,
} from "../components/firebaseConfig/utils.js";
import { auth } from "../components/firebaseConfig/firebase";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import {
    getStorage,
    getStream,
    listAll,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

// TODO: backend integration
// TODO: Frontend -> Bootstrap
// polish CSS if time
// rework padding?

export default function Profile() {
    const navigate = useNavigate();

    function signout() {
        navigate("/");
        logout();
    }

    function editProfile() {
        navigate("/edit-profile");
    }

    const [reviews, setReviews] = React.useState([]);
    // const [imgRef, setimgRef] = React.useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [userImage, setUserImage] = useState();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                console.log("no user");
                return;
            }
            console.log("getting userdata");
            getUsers(user.uid).then((userDetails) => {
                setUserDetails(userDetails);
                console.log(userDetails);
                if (userDetails?.image.startsWith("https://")) {
                    setUserImage(userDetails.image);
                } else {
                    const storage = getStorage();
                    getDownloadURL(
                        ref(storage, userDetails.uid + "/" + userDetails.image)
                    ).then((url) => {
                        setUserImage(url);
                    });
                }
            });
            getUserReviews(user.uid).then((reviews) => {
                setReviews(reviews);
            });
        });
    }, []);

    if (auth.currentUser) {
        const image = userImage ? userImage : ProfileImage;
        const name = userDetails.name;
        const bio = userDetails.bio
            ? userDetails.bio
            : "A Very Mysterious Person...";
        const place1 = userDetails.favDining1
            ? userDetails.favDining1
            : "None Yet...";
        const place2 = userDetails.favDining2
            ? userDetails.favDining2
            : "None Yet...";
        const numReviews = 0; //userDetails.reviews.length();
        const numDining = 0; //userDetails.dining.length();

        return (
            <Container className="px-0 text-dark">
                <Row className="mb-3">
                    <Col>
                        <h1 className="fs-1">Welcome, {name}</h1>
                    </Col>
                </Row>
                <Row className="py-5 mx-0 bg-light">
                    <Col className="px-3" align="center">
                        <Image className="w-75" src={image} />
                        <h3> {name} </h3>
                        <p> {bio} </p>
                    </Col>
                    <Col className="mt-3">
                        <h3>Favorite Places</h3>
                        <Stack gap={1} className="m-3">
                            <div>
                                <h4> {place1} </h4>
                                <p> 4 visits</p>
                            </div>
                            <div>
                                <h4> {place2} </h4>
                                <p> 2 visits</p>
                            </div>
                        </Stack>
                    </Col>
                    <Col className="mt-3">
                        <h3>Activity</h3>
                        <p> {numReviews} Reviews posted</p>
                        <p> {numDining} Meals recorded</p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="">
                        <Stack gap={3}>
                            {reviews.map((review, i) => {
                                return (
                                    <Col key={i} className="px-0 col-12 gy-3">
                                        <ReviewCard
                                            review_header={review.title}
                                            review_text={review.body}
                                            review_rating={review.rating}
                                            review_sender={review.user}
                                            review_dining={review.diningHall}
                                            review_time={review.createdAt}
                                            // <p>{review.user}</p>
                                        />
                                    </Col>
                                );
                            })}
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    <Col className="mx-0 my-5 d-grid gap-2">
                        <Button
                            variant="primary"
                            className="btn"
                            size="lg"
                            onClick={() => editProfile()}
                        >
                            Edit your Profile!
                        </Button>
                        <Button
                            variant="danger"
                            className="btn"
                            size="lg"
                            onClick={() => signout()}
                        >
                            Sign Out
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <SignIn />;
    }
}
