import React from "react";
import "./header-style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import Register from "../register/register-componenet";
import LogIn from "../login/login-component";

import logo from "../../assets/images/logo-1.png";

import { auth } from "../../assets/firebase/firebase.utils";

export const Header = ({ currentUser }) => (
	<header style={{ paddingBottom: "100px" }}>
		<div className="w-full fixed z-40">
			<nav className="w-full mx-auto bg-white nav-bar">
				<div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
					<div className="h-full flex items-center">
						<a
							href="/"
							aria-label="Home"
							role="img"
							className="mr-10 flex items-center h-full"
						>
							<img className="h-full" src={logo} alt="logo" />
						</a>
						<div className="header_search">
							<a
								href="#search"
								className="flex items-center gap-x-2 text-white"
							>
								<FontAwesomeIcon icon={solid("magnifying-glass")} />
								<div className="font-medium">SEARCH</div>
							</a>
						</div>
					</div>
					{currentUser ? (
						<div className="h-full items-center justify-center user_actions flex flex-row ">
							<div className="dashboard flex items-center gap-x-2 text-white cursor-pointer">
								<FontAwesomeIcon icon={solid("user")} />
								<a href="/dashboard">Panou de control</a>
							</div>
							<div className="mx-6 text-white">
								<FontAwesomeIcon icon={solid("grip-lines-vertical")} />
							</div>
							<div
								className="sign_out text-white cursor-pointer"
								onClick={() => auth.signOut()}
							>
								<div>Deloghează-te</div>
							</div>
						</div>
					) : (
						<div className="h-full items-center justify-center user_actions flex flex-row ">
							<div className="sign_up flex items-center gap-x-2 text-white cursor-pointer">
								<FontAwesomeIcon icon={solid("user")} />
								<Register />
							</div>
							<div className="mx-6 text-white">
								<FontAwesomeIcon icon={solid("grip-lines-vertical")} />
							</div>
							<div className="log_in text-white cursor-pointer">
								<LogIn />
							</div>
						</div>
					)}
				</div>
			</nav>
			{/* Navigation ends */}
		</div>
	</header>
);
