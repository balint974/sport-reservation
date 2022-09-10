import React, { useState, useEffect } from "react";
import { firestore } from "../../../assets/firebase/firebase.utils";
import { query, where, updateDoc } from "firebase/firestore";
import { Check } from "@mui/icons-material";

import "./client-booking-style.scss";

const ClientBookings = ({ currentUser }) => {
	const [reservations, setReservations] = useState(new Date());

	const getReservations = () => {
		const reservationsRef = firestore
			.collection("facilities")
			.doc(currentUser.id)
			.collection("reservations");

		const now = new Date();

		const query = reservationsRef.where("date", ">=", now).orderBy("date");

		query
			.get()
			.then((querySnapshot) => {
				var reservationsObj = [];
				querySnapshot.forEach((doc) => {
					var curReservation = doc.data();
					// console.log(formatDate(curReservation.date.seconds + (parseInt(curReservation.time)*3600)))
					// curReservation.time = formatDate(curReservation.time.seconds);
					var reservationId = { reservationId: doc.id };
					var combReservation = Object.assign(curReservation, reservationId);
					reservationsObj.push(combReservation);
				});
				console.log(reservationsObj);
				setReservations(reservationsObj);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	useEffect(() => {
		getReservations();
	}, []);

	const confirmHandle = (e) => {
		const reservationID = e.target.getAttribute("value");
		const reservationRef = firestore
			.collection("facilities")
			.doc(currentUser.id)
			.collection("reservations")
			.doc(reservationID);

		updateDoc(reservationRef, {
			aproved: true,
		})
			.then((response) => {
				alert("Rezervare confirmata!");
				getReservations();
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="client_bookings">
			<h1>Rezervări în așteptare/confirmate</h1>
			<div className="pending-items">
				<table className="pending-reservations">
					{reservations.length ? (
						<thead>
							<tr>
								<th>Data</th>
								<th>Nume</th>
								<th>Email</th>
								<th>Pentru data</th>
								<th>intervalul</th>
								<th>Aprobă</th>
								{/* <th>Respinge</th> */}
							</tr>
						</thead>
					) : (
						""
					)}
					<tbody>
						{reservations.length ? (
							reservations.map((reservation, index) => {
								var classes = "",
									text = "";
								if (reservation.aproved) {
									classes = "pending-item approved";
								} else {
									classes = "pending-item not-approved";
									text = "CONFIRMĂ";
								}

								return (
									<tr key={index} className={classes}>
										<td key={index + 4} className="pending-at">
											{formatDate(reservation.reservationRequestAt.seconds)}
										</td>
										<td key={index + 1} className="pending-name">
											{reservation.name}
										</td>
										<td key={index + 5} className="pending-email">
											{reservation.email}
										</td>
										<td key={index + 2} className="pending-date font-bold">
											{formatDate(reservation.date.seconds, true)}
										</td>
										<td key={index + 3} className="pending-time font-bold">
											{reservation.time} - {parseInt(reservation.time) + 1}
										</td>
										{text ? (
											<td
												value={reservation.reservationId}
												className="confirm button-style"
												onClick={confirmHandle}
											>
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

export default ClientBookings;

function formatDate(sec, onlyDate = false) {
	var date = new Date(sec * 1000);
	if (onlyDate) {
		return date.toLocaleDateString();
	} else {
		return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
	}
}
