import { Row, Col } from 'react-bootstrap';
import { Container, Image, Stack, Button } from 'react-bootstrap';

import ProfileImage from '../assets/placeholder.jpg'
import {} from "../components/ProfileComponents.js"
import ReviewCard from '../components/ReviewCard.js'
import { logout, getUsers } from "../components/firebaseConfig/utils.js"
import { auth } from '../components/firebaseConfig/firebase';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getStorage, getStream, listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

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
		navigate("/edit-profile")
	}

	const [userDetails, setUserDetails] = useState([]);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				console.log("no user");
				return;
			}
			console.log("getting userdata");
			getUsers(user.uid).then((userDetails) => {
				setUserDetails(userDetails);
			});		
		})
	}, []);

	

	const storage = getStorage();
	const imgRef = ref(storage, userDetails.uid + "/");

	const [userImage, setUserImage] = useState();

	useEffect(() => {
		listAll(imgRef).then((response) => {
			response.items.forEach((item) => {
				if (item.name === userDetails.img) {
					getDownloadURL(item).then((url) => {
						setUserImage(url);
					})
				}
			})
		})
	})

	if (auth.currentUser) {
		console.log(userDetails);

		const image = userImage ? userImage : ProfileImage;
		const name = userDetails.name;
		const bio = userDetails.bio ? userDetails.bio : "A Very Mysterious Person...";
		const place1 = userDetails.favDining1 ? userDetails.favDining1 : "None Yet...";
		const place2 = userDetails.favDining2 ? userDetails.favDining2 : "None Yet...";
		const numReviews = 0 //userDetails.reviews.length();
		const numDining = 0 //userDetails.dining.length();

		return (
			<Container className="px-0 text-dark">
				<Row className="mb-3">
					<Col>
						<h1 className="fs-1">Welcome, { name }</h1>
					</Col>
				</Row>
				<Row className="py-5 mx-0 bg-light">
					<Col className="px-3" align="center">
						<Image className="w-75" src={ image } />
						<h3> { name } </h3>
						<p> { bio } </p>
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
						<p> { numReviews } Reviews posted</p>
						<p> { numDining } Meals recorded</p>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col className="">
						<Stack gap={3}>
							<ReviewCard 
								review_header="B-Plate"
								review_rating="4/5"
								review_time="14:15, Thursday"
								review_text="this place is cool and good."
							></ReviewCard>
						</Stack>
					</Col>
				</Row>
				<Row>
					<Col className="mx-0 my-5 d-grid gap-2">
						<Button variant="primary"
							class="btn"
							size="lg"
							onClick={ () => editProfile() }>
							Edit your Profile!
						</Button>
						<Button variant="danger" 
							class="btn" 
							size="lg"
							onClick={ () => signout() }>
							Sign Out
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
	else {
		return <SignIn />
	}
}
