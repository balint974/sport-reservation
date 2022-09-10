import { Component } from "react";
import {
	auth,
	createUserProfileDocument,
} from "./assets/firebase/firebase.utils";
import "./App.css";
import logo from "./assets/images/logo-1.png";

import { Homepage } from "./pages/homepage/homepage-component";
import { Dashboard } from "./pages/dashboard/dashboard-component";
import SearchPage from "./pages/search/search-page";
import { FacilitySingle } from "./pages/facility-single/facility-single-page";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
			componentDidMount: false,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRole = { userRole: "Subscriber" };
				const userRef = await createUserProfileDocument(userAuth, userRole);

				userRef.onSnapshot((snapShot) => {
					this.setState(
						{
							currentUser: {
								id: snapShot.id,
								...snapShot.data(),
							},
						},
						() => {
							this.setState({ componentDidMount: true });
						}
					);
				});
			} else {
				this.setState({ currentUser: userAuth });
				if (this.state.currentUser == null) {
					this.setState({ componentDidMount: true });
				}
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<>
				{this.state.componentDidMount || this.state.currentUser ? (
					<BrowserRouter basename="/sport-reservation">
						<Routes>
							<Route
								exact
								path="/"
								element={<Homepage currentUser={this.state.currentUser} />}
							/>

							<Route
								exact
								path="/dashboard"
								element={
									<Dashboard
										currentUser={this.state.currentUser}
										currentSubpage="home"
									/>
								}
							/>

							<Route
								exact
								path="/dashboard/user/create"
								element={
									<Dashboard
										currentUser={this.state.currentUser}
										currentSubpage="create"
									/>
								}
							/>
							<Route
								exact
								path="/dashboard/facility"
								element={
									<Dashboard
										currentUser={this.state.currentUser}
										currentSubpage="facility"
									/>
								}
							/>
							<Route
								exact
								path="/dashboard/pending-bookings"
								element={
									<Dashboard
										currentUser={this.state.currentUser}
										currentSubpage="pending-bookings"
									/>
								}
							/>
							<Route
								exact
								path="/dashboard/subscriber-bookings"
								element={
									<Dashboard
										currentUser={this.state.currentUser}
										currentSubpage="subscriber-bookings"
									/>
								}
							/>
							<Route
								exact
								path="/search"
								element={<SearchPage currentUser={this.state.currentUser} />}
							/>
							<Route
								exact
								path="/facility/:userId"
								element={
									<FacilitySingle currentUser={this.state.currentUser} />
								}
							/>
						</Routes>
					</BrowserRouter>
				) : (
					<div className="loadingScreen">
						<img src={logo} alt="logo" />
						<BarLoader loading={true} />
					</div>
				)}
			</>
		);
	}
}

export default App;
