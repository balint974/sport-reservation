import React from "react";
import { Header } from "../../components/header/header-component";
import { Footer } from "../../components/footer/footer-component";
import { useLocation } from "react-router-dom";
import FacilityBookings from "../../components/dashboard-components/facility-bookings/facility-bookings-component";
import LogIn from "../../components/login/login-component";
import Register from "../../components/register/register-componenet";
import { Navigate } from "react-router-dom";

import "./facility-single-style.scss";

export const FacilitySingle = ({ currentUser }) => {
	const location = useLocation();
	if (location.state === null) {
		return <Navigate to="/" />;
	}
	const {
		authorId,
		fieldName,
		fieldInfo,
		// fieldType,
		fieldPhone,
		fieldImages,
		fieldAddress,
		startHours,
		endHours,
	} = location.state.facility;

	return (
		<>
			<Header currentUser={currentUser} />
			<div className="single_facility container mx-auto my-20">
				<h1 className="text-center">{fieldName}</h1>
				<div className="facility_images">
					{fieldImages && fieldImages.length
						? fieldImages.map((image, index) => {
								return (
									<div
										style={{
											backgroundImage: `url(${image})`,
										}}
										className="facility_image"
										key={index}
									></div>
								);
						  })
						: ""}
				</div>
				<div className="facility_description mb-6">
					<h2>{fieldInfo}</h2>
				</div>
				<div className="facility_address mb-4">
					<h3>Adresă: {fieldAddress.label} </h3>
				</div>
				<div className="facility_schedule mb-4">
					<h3>
						Program: {startHours} - {endHours}
					</h3>
				</div>
				<div className="facility_phone mb-4">
					<h3>Telefon rezervări: {fieldPhone}</h3>
				</div>
			</div>
			<div className="container mx-auto">
				{currentUser ? (
					"Customer" === currentUser.userRole ||
					"Administrator" === currentUser.userRole ? (
						<div className="error">
							Puteți face rezervări doar cu contul de Abonat!
						</div>
					) : (
						<FacilityBookings
							currentUser={currentUser}
							facilityUserId={authorId}
						/>
					)
				) : (
					<div className="facility_login">
						<LogIn />
						<div> pentru a putea face o rezervare sau </div>
						<Register />
						<div> dacă nu ai un cont!</div>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
};
