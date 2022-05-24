import "../css/App.css"
import "../css/SignIn.css";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailSignIn, googleSignIn } from "../components/firebaseConfig/utils";
import { auth } from "../components/firebaseConfig/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SignIn() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();

	const user = auth.currentUser;
	console.log(user);
	if (user) {
		navigate('/profile');
	}

	// useEffect(() => {
	//     auth.currentUser ? console.log(auth.currentUser.email) : console.log("no user");
	//     if (auth.currentUser) {
	//         navigate("/");
	//     }
	// }, [auth.currentUser])

	function emailRedir(email, password) {
		emailSignIn(email, password);
		navigate("/")
	} 

	function googleRedir(email, password) {
		googleSignIn(email, password);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/");
			}
		})
	}

	return (
		<div>
			<h1>Sign-In to View Your Profile!</h1>
			<div className="centered">
				<div className="signin">
					<input type="text" className="signin-input" 
						value={ email } onChange={ (e) => setEmail(e.target.value) } 
						placeholder="Input your Email" />
					<input type="password" className="signin-input"
						value={ password } onChange={ (e) => setPassword(e.target.value) }
						placeholder="Input your Password" />
					<button className="signin-button"
						onClick={ () => emailRedir(email, password)}>
						Sign In!
					</button>
					<button className="signin-button signin-google"
						onClick={ () => googleRedir() }>
						Sign In with Google!
					</button>
					<div>
						<Link to="/register">Create an Account!</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
