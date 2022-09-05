import React from "react";
import "./dashboard_home.scss";

export const DashboardHome = ({ displayName }) => (
	<div className="dashboard_home">
		<h1>Bine ai venit, {displayName}</h1>
	</div>
);
