import React from "react";
import { Header } from "../../components/header/header-component";
import { Footer } from "../../components/footer/footer-component";

import Sidebar from "../../components/dashboard-components/sidebar/Sidebar";
import { DashboardHome } from "../../components/dashboard-components/dashboard_home/dashboard_home";
import { CreateUser } from "../dashboard-pages/create-user";
import FacilityForm from "../../components/dashboard-components/facility-form-component/facility-form-component";

import { Navigate } from "react-router-dom";

export const Dashboard = ({ currentUser, currentSubpage }) => (
	<div className="App">
		{!currentUser ? (
			<Navigate to="/" />
		) : (
			<>
				{console.log("Role: " + currentUser.userRole)}
				<Header currentUser={currentUser} />
				<div className="container mx-auto containerApp">
					<Sidebar currentUser={currentUser} />

					{currentSubpage === "home" ? (
						<DashboardHome displayName={currentUser.displayName} />
					) : (
						""
					)}

					{currentSubpage === "create" ? (
						<CreateUser currentUser={currentUser} />
					) : (
						""
					)}

					{currentSubpage === "facility" ? (
						<FacilityForm currentUser={currentUser} />
					) : (
						""
					)}
				</div>
				<Footer />
			</>
		)}
	</div>
);
