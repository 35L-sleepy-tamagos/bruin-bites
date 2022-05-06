import { Container, Row } from 'react-bootstrap';
import { Image, Stack } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import ProfileImage from '../assets/placeholder.jpg'
// add css later
// TODO: make favorite places list components?

function ProfileHeader(props) {
	return (
		<Container className="bg-light p-5 fluid">
			<Row>
				<Col className="" style={{background: '#d0e5ff'}}>
					<div className="w-auto" align="center">
						<Image className="w-75" src={ProfileImage} />
						<h1>{props.title}</h1>
						<p> {props.introduction} </p>
					</div>
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
		</Container>
	);
}

export default ProfileHeader;

