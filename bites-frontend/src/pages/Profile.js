import { Container, Stack } from "react-bootstrap"
import ProfileHeader from "../components/ProfileComponents"
// TODO: bring profileheader into file
// TODO: make component for reviews

function Home() {
	return (
		<div className="Home">
			<Container>
				<ProfileHeader
					title="Joe Bruin"
					introduction="A very mysterious person."	
				></ProfileHeader>
			</Container>
			<Container>
			<Stack gap={3} style={{marginTop: 20}}>
				<div className="bg-light">First Review</div>
				<div className="bg-light">Second Review</div>
				<div className="bg-light">Third Review</div>
			</Stack>
			</Container>
		</div>

	)
}

export default Home

