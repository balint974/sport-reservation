import React from "react";

import CreateUserForm from "../../components/dashboard-components/create-user-form/create-user-form-component";

import { Navigate } from "react-router-dom";

export const CreateUser = ({currentUser}) => (
	<div className="create_user_container">
		{String(currentUser.userRole) === "Administrator" ? (
			<>
				<h1>Creează utilizator (Client)</h1>
				<CreateUserForm />
			</>
		) : (
			<Navigate to="/dashboard" />
		)}
	</div>
);
