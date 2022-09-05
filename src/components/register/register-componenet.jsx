import React from "react";
import Popup from "reactjs-popup";
// import LogIn from "../login/login-component";
import logo from "../../assets/images/logo-inline.png";
import "./register-style.css";

import {
	auth,
	createUserProfileDocument,
} from "../../assets/firebase/firebase.utils";

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			errorMessage: "",
			errorType: "",
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, {
				displayName: name,
				userRole: "Subscriber",
			});

			this.setState({
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.error(error);
			var errorMessage = "";
			var errorType = "";
			switch (error.message) {
				case "Firebase: Password should be at least 6 characters (auth/weak-password).":
					errorMessage = "Parola trebuie să conțină minim 6 caractere!";
					errorType = "password";
					break;
				case "Firebase: The email address is already in use by another account. (auth/email-already-in-use).":
					errorMessage =
						" Adresa de email este deja folosita de catre alt utilizator!";
					errorType = "email";
					break;
				default:
					errorMessage = "Eroare la trimiterea formularuli!";
					errorType = "other";
			}
			this.setState({ errorMessage });
			this.setState({ errorType });
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Popup
				trigger={
					<button className="button" id="register">
						{" "}
						Înregistrează-te{" "}
					</button>
				}
				modal
			>
				<div className="register">
					<img src={logo} alt="" />
					<h2>Înregistrează-te</h2>

					<form onSubmit={this.handleSubmit}>
						{this.state.errorType === "other" ? (
							<div className="submitError">{this.state.errorMessage}</div>
						) : (
							""
						)}
						<label htmlFor="name">Nume</label>
						<input
							type="text"
							name="name"
							value={this.state.name}
							required
							onChange={this.handleChange}
						/>
						<label htmlFor="email">Email</label>
						{this.state.errorType === "email" ? (
							<div className="submitError">{this.state.errorMessage}</div>
						) : (
							""
						)}
						<input
							type="email"
							name="email"
							value={this.state.email}
							required
							onChange={this.handleChange}
						/>
						<label htmlFor="password">Parola</label>
						{this.state.errorType === "password" ? (
							<div className="submitError">{this.state.errorMessage}</div>
						) : (
							""
						)}
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							required
						/>
						<label htmlFor="password">Repetă parola</label>
						<input
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							required
						/>
						<input type="submit" value="Creează cont" />
					</form>
					<div className="more-info">
						Ai cont deja?
						<a href="#login" className="login-link">
							Loghează-te
							{/* <LogIn /> */}
						</a>
					</div>
				</div>
			</Popup>
		);
	}
}

export default Register;
