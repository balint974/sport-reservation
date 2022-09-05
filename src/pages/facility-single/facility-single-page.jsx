import React from "react";
import { Header } from "../../components/header/header-component";
import { Footer } from "../../components/footer/footer-component";
import { useLocation } from "react-router-dom";

import "./facility-single-style.scss";

export const FacilitySingle = ({ currentUser }) => {
	const location = useLocation();
	const {
		// authorId,
		fieldName,
		fieldInfo,
		// fieldType,
		fieldPhone,
		fieldImages,
		fieldAddress,
		fieldWorkingHours,
	} = location.state.facility;

	return (
		<>
			<Header currentUser={currentUser} />
			<div className="single_facility container mx-auto my-20">
				<h1 className="text-center">{fieldName}</h1>
				<div className="facility_images">
					{fieldImages.map((image, index) => {
						return (
							<div
								style={{
									backgroundImage: `url(${image})`,
								}}
								className="facility_image"
								key={index}
							></div>
						);
					})}
				</div>
				<div className="facility_description mb-6">
					<h2>{fieldInfo}</h2>
				</div>
				<div className="facility_address mb-4">
					<h3>Adresă: {fieldAddress.label} </h3>
				</div>
				<div className="facility_schedule mb-4">
					<h3>Program: {fieldWorkingHours}</h3>
				</div>
				<div className="facility_phone mb-4">
					<h3>Telefon rezervări: {fieldPhone}</h3>
				</div>
			</div>
			<Footer />
		</>
	);
};
