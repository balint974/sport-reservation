import "./sidebar.scss";

import {
	CalendarMonth,
	Home,
	People,
	Place,
	PersonAddAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

const Sidebar = ({ currentUser }) => {
	return (
		<div className="sidebarComponent">
			<div className="wrapper">
				<div className="menu">
					<h3>Panou de control</h3>
					<ul>
						<Link to="/" className="link">
							<li>
								<Home className="icon" />
								Acasă
							</li>
						</Link>

						{currentUser.userRole === "Subscriber" ? (
							<Link to="/dashboard/subscriber-bookings" className="link">
								<li>
									<CalendarMonth className="icon" />
									Rezervări
								</li>
							</Link>
						) : (
							""
						)}

						{currentUser.userRole === "Administrator" ? (
							<>
								{/* <Link to="/dashboard/users" className="link">
									<li>
										<People className="icon" />
										Utilizatori
									</li>
								</Link> */}
								<Link to="/dashboard/user/create" className="link">
									<li>
										<PersonAddAlt className="icon" />
										Creează utilizator
									</li>
								</Link>
							</>
						) : (
							""
						)}

						{currentUser.userRole === "Customer" ? (
							<>
								<Link to="/dashboard/pending-bookings" className="link">
									<li>
										<CalendarMonth className="icon" />
										Rezervări
									</li>
								</Link>
								<Link to="/dashboard/facility" className="link">
									<li>
										<Place className="icon" />
										Facilitate sportiva
									</li>
								</Link>
							</>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
