import React from "react";
import { Header } from "../../components/header/header-component";
import { Footer } from "../../components/footer/footer-component";

import Sidebar from "../../components/dashboard-components/sidebar/Sidebar";
import { DashboardHome } from "../../components/dashboard-components/dashboard_home/dashboard_home";
import { CreateUser } from "../dashboard-pages/create-user";
import FacilityForm from "../../components/dashboard-components/facility-form-component/facility-form-component";
import ClientBookings from "../../components/dashboard-components/client-booking/client-bookings-component";
import SubscriberBookings from "../../components/dashboard-components/subscriber-bookins/subscriber-bookings-components";

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

					{currentSubpage === "pending-bookings" ? (
						<ClientBookings currentUser={currentUser} />
					) : (
						""
					)}
					{currentSubpage === "subscriber-bookings" ? (
						<SubscriberBookings currentUser={currentUser} />
					) : (
						""
					)}
				</div>
				<Footer />
			</>
		)}
	</div>
);
