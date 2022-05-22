import { Container, Image, Stack } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import ProfileImage from '../assets/placeholder.jpg'
import {} from "../components/ProfileComponents.js"
import ReviewCard from '../components/ReviewCard.js'
import { logout, getUsers } from "../components/firebaseConfig/utils.js"
import { auth } from '../components/firebaseConfig/firebase';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';

// TODO: backend integration
// polish CSS if time

export default function Profile() {

	const navigate = useNavigate();

	function signout() {
		navigate("/");
		logout();
	}

	if (auth.currentUser) {
		console.log(auth.currentUser);
	}
	else {
		console.log("no user: profile");
	}

	const [userDetails, setUserDetails] = useState([]);
	useEffect(() => {
		if (!auth.currentUser) {
			return;
		}
		console.log("getting userdata");
		getUsers(auth.currentUser.uid).then((userDetails) => {
			setUserDetails(userDetails);
		});
	}, []);

	if (auth.currentUser) {
		console.log(userDetails);
		return (
			<div className="Profile">
				<h1>Welcome, {userDetails[0]}</h1>
				<Container className="bg-light p-5 fluid text-dark">
					<Row>
						<Col className="px-3 mx-5" style={{background: '#d0e5ff'}} align="center">
								<Image className="w-75" src={ProfileImage} />
								<h3>Joe Bruin</h3>
								<p>A very mysterious person</p>
						</Col>
						<Col className="mt-3">
							<h3>Favorite Places</h3>
							<Stack gap={1} className="m-3">
								<div> 
									<h4>Place 1 </h4>
									<p> 4 visits</p>
								</div>
								<div> 
									<h4>Place 2 </h4>
									<p> 2 visits</p>
								</div>
							</Stack>
						</Col>
						<Col className="mt-3">
							<h3>Activity</h3>
							<p>10 Reviews posted</p>
							<p>16 Meals in the past week</p>
						</Col>
					</Row>
					<Row className="mt-5 px-0">
						<Col className="px-0">
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
				</Container>
				<div class="col-md-12 text-center m-5">
					<button class="btn btn-danger btn-lg" 
					onClick={ () => signout() }>
						Sign Out
					</button>
				</div>
			</div>
		)
	}
	else {
		return <SignIn />
	}
}