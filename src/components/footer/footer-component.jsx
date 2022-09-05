import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./footer-style.css";
import logo from "../../assets/images/logo-1.png";

export const Footer = (props) => (
	<footer className="w-full">
		<div className="container mx-auto flex flex-col justify-center items-center">
			<img className="h-full footer_logo" src={logo} alt="logo" />
			<div className="social-logos">
				<a href="#facebook" className="facebook social">
					<FontAwesomeIcon icon={brands("facebook-f")} />
				</a>
				<a href="#insta" className="instagram social">
					<FontAwesomeIcon icon={brands("instagram")} />
				</a>
				<a href="#twit" className="twitter social">
					<FontAwesomeIcon icon={brands("twitter")} />
				</a>
				<a href="#linked-in" className="linkedin social">
					<FontAwesomeIcon icon={brands("linkedin-in")} />
				</a>
			</div>
			<div className="rights pt-2">
				<h6>Sport Reservation © 2022. All Rights Reserved.</h6>
			</div>
		</div>
	</footer>
);
