import "../css/SignIn.css";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegister, googleSignIn } from "../components/firebaseConfig/utils";
import { auth } from "../components/firebaseConfig/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	let navigate = useNavigate();

	// onAuthStateChanged(auth, (user) => {
	//     if (user) {
	//         console.log(user.email);
	//         navigate("/");
	//     }
	//     else {
	//         return;
	//     }
	// })
	useEffect(() => {
		auth.currentUser ? console.log(auth.currentUser.email) : console.log("no user");
		if (auth.currentUser) {
			navigate("/");
		}
	}, [auth.currentUser])

	const register = (name, email, password) => {
		console.log("calling function");
		console.log(name);
		console.log(email);
		console.log(password);
		emailRegister(name, email, password);
		navigate("/");
	};

	return (
		<div>
			<h1>Register for an Account!</h1>
			<div className="centered">
				<div className="signin">
					<input type="text" className="signin-input"
						value={ name } onChange={ (e) => setName(e.target.value) }
						placeholder="Input your Name" />
					<input type="text" className="signin-input" 
						value={ email } onChange={ (e) => setEmail(e.target.value) } 
						placeholder="Input your Email" />
					<input type="password" className="signin-input"
						value={ password } onChange={ (e) => setPassword(e.target.value) }
						placeholder="Input your Password" />
					<button className="signin-button"
						onClick={ () => register(name, email, password) }>
						Register Now!
					</button>
					<button className="signin-button signin-google"
						onClick={ () => googleSignIn() }>
						Register with Google!
					</button>
					<div>
						<Link to="/signin">Already Have an Account? Sign In Here!</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
