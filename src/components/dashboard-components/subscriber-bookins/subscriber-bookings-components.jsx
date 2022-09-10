import React, { useState, useEffect } from "react";
import { firestore } from "../../../assets/firebase/firebase.utils";
import { Check } from "@mui/icons-material";

import "./subscriber-booking-style.scss";

const SubscriberBookings = ({ currentUser }) => {
	const [reservationsData, setReservations] = useState([]);

	function getReservations() {
		const ref = firestore.collectionGroup("reservations");
		const now = new Date();

		var query = ref.where("date", ">=", now);
		query = query
			.where("userID", "==", currentUser.id.toString())
			.orderBy("date");

		var reservationsObj = [];

		query
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					reservationsObj.push(doc.data());
				});
				setReservations(reservationsObj);
			})
			.catch((error) => {
				console.log("Error getting facilities: ", error);
			});
	}

	useEffect(() => {
		getReservations();
	}, []);

	return (
		<div className="subscriber_bookings">
			<h1>Rezervările tale</h1>
			<div className="reservation-items">
				<table className="reservations">
					{reservationsData && reservationsData.length ? (
						<thead>
							<tr>
								<th>Teren</th>
								<th>Telefon</th>
								<th>Pentru data</th>
								<th>intervalul</th>
								<th>Status</th>
								{/* <th>Respinge</th> */}
							</tr>
						</thead>
					) : (
						""
					)}
					<tbody>
						{reservationsData && reservationsData.length ? (
							reservationsData.map((reservation, index) => {
								var classes = "",
									text = "";
								if (reservation.aproved) {
									classes = "reservation item approved";
									text = "CONFIRMAT";
								} else {
									classes = "reservation not-approved";
									text = "ÎN AȘTEPTARE";
								}

								return (
									<tr key={index} className={classes}>
										<td className="fac-name">
											{reservation.facilityData.facilityName}
										</td>
										<td className="fac-phone">
											{reservation.facilityData.facilityPhone}
										</td>
										<td className="fac-date">
											{formatDate(reservation.date.seconds, true)}
										</td>
										<td className="fac-int">
											{reservation.time} - {parseInt(reservation.time) + 1}
										</td>
										{text ? (
											<td value={reservation.reservationId} className="confirm">
												{text}
											</td>
										) : (
											<td>
												<Check className="icon" />
											</td>
										)}
									</tr>
								);
							})
						) : (
							<tr></tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SubscriberBookings;

function formatDate(sec, onlyDate = false) {
	var date = new Date(sec * 1000);
	if (onlyDate) {
		return date.toLocaleDateString();
	} else {
		return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
	}
}
