import { Container, Image, Stack } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import ProfileImage from '../assets/placeholder.jpg'
import {} from "../components/ProfileComponents.js"
import ReviewCard from '../components/ReviewCard.js'

// TODO: backend integration
// polish CSS if time

export default function Profile() {
	return (
		<div className="Profile">
			<Container className="bg-light p-5 fluid">
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
		</div>

	)
}
