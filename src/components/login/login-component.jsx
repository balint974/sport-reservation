import React from "react";
import Popup from "reactjs-popup";
import logo from "../../assets/images/logo-inline.png";
// import ReactiveButton from "reactive-button";
import { auth, signInWithGoogle } from "../../assets/firebase/firebase.utils";
import "./login-style.css";

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: "", password: "" });
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Popup
				trigger={
					<button className="button" id="login">
						{" "}
						Loghează-te{" "}
					</button>
				}
				modal
			>
				<div className="register">
					<img src={logo} alt="" />
					<h2>Loghează-te</h2>

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={this.state.email}
							required
							onChange={this.handleChange}
						/>
						<label htmlFor="password">Parola</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							required
						/>
						<input type="submit" value="Loghează-te" />
						<div className="google-auth" onClick={signInWithGoogle}>
							Loghează-te cu Google
						</div>
					</form>
					<div className="more-info">
						Nu ai cont?
						<a href="#login" className="login-link">
							{" "}
							Înregistrează-te
						</a>
					</div>
				</div>
			</Popup>
		);
	}
}

export default LogIn;
