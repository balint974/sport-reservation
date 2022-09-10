import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./facility-booking-style.scss";
import {
	firestore,
	createReservationEntry,
} from "../../../assets/firebase/firebase.utils";

const FacilityBookings = ({ currentUser, facilityUserId }) => {
	const [date, onChange] = useState(new Date());
	const [startHours, setStartHours] = useState(""); 
	const [endHours, setEndHours] = useState("");
	const [selectedHour, setSchedule] = useState("");
	const [pendingReservations, setPendingReservations] = useState("");
	const [approvedReservations, setApprovedReservations] = useState("");
	const [facilityData, setFacilityData] = useState("");

	useEffect(() => {
		firestore
			.collection("facilities")
			.doc(facilityUserId)
			.onSnapshot((snapshot) => {
				const facility = snapshot.data();

				//reorder fieldType
				const start = facility.startHours;
				const end = facility.endHours;
				const facilityName = facility.fieldName;
				const facilityPhone = facility.fieldPhone;
				const facilityAddress = facility.fieldAddress.label;
				setStartHours(start);
				setEndHours(end);
				setFacilityData({ facilityName, facilityPhone, facilityAddress });
			});
		setAprovedPendingReservations(date);
	}, []);

	const setAprovedPendingReservations = (data) => {
		const reservationsRef = firestore
			.collection("facilities")
			.doc(facilityUserId)
			.collection("reservations");

		const selectedData = getFormatedData(data);

		const query = reservationsRef.where("formattedDate", "==", selectedData);

		query
			.get()
			.then((querySnapshot) => {
				var approvedObj = [];
				var pendingObj = [];
				querySnapshot.forEach((doc) => {
					var curReservation = doc.data();

					if (curReservation.aproved) {
						approvedObj.push(curReservation.time);
					} else {
						pendingObj.push(curReservation.time);
					}
				});
				setApprovedReservations(approvedObj);
				setPendingReservations(pendingObj);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const onChangeHandle = (data) => {
		onChange(data);
		setSchedule("");
		setAprovedPendingReservations(data);
	};

	const bookSport = () => {
		const formattedDate = getFormatedData(date);

		console.log(facilityData);

		const reservationInfo = {
			name: currentUser.displayName,
			time: selectedHour,
			date,
			formattedDate,
			facilityUserId,
			currentUserId: currentUser.id,
			email: currentUser.email,
			facilityData,
		};

		const createdReservation = createReservationEntry(reservationInfo);
		if (createdReservation) {
			alert(
				"Cererea rezervării a fost înregistrată. Proprietarul terenului de sport vă va contacta pentru confirmare!"
			);
			setSchedule("");
			setAprovedPendingReservations(date);
		}
	};

	return (
		<div className="facility_bookings">
			<Calendar
				onChange={onChangeHandle}
				value={date}
				locale="ro-RO"
				minDate={new Date()}
			/>
			<DisplayAvailableHours
				start={startHours}
				end={endHours}
				selectSchedule={setSchedule}
				selected={selectedHour}
				pendingReservations={pendingReservations}
				approvedReservations={approvedReservations}
				selectedDate={date}
			/>
			{selectedHour ? (
				<div onClick={bookSport} className="make-reservation button-style">
					REZERVĂ
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default FacilityBookings;

const DisplayAvailableHours = ({
	start,
	end,
	selected,
	selectSchedule,
	pendingReservations,
	approvedReservations,
	selectedDate,
}) => {
	// console.log(selected);
	const startInt = parseInt(start);
	const endInt = parseInt(end);
	var hours = [];

	const clickItemHandle = (data) => {
		var hour = data.target.getAttribute("value");
		selectSchedule(hour);
	};

	const selectedData = getFormatedData(selectedDate);
	const currentDate = getFormatedData(new Date());
	var currentHour = new Date().getHours();

	if (endInt - startInt > 0) {
		var schedule = [];
		for (var i = startInt; i < endInt; i++) {
			if (approvedReservations.includes(i.toString())) {
				continue;
			}

			if (selectedData === currentDate) {
				if (i <= currentHour) continue;
			}

			if (10 - i > 0) {
				if (i < 9) {
					schedule.push("0" + i + " - 0" + (i + 1));
				} else {
					schedule.push("0" + i + " - " + (i + 1));
				}
			} else {
				schedule.push(i + " - " + (i + 1));
			}
			hours.push(i);
		}

		if (schedule.length) {
			return (
				<>
					<div className="schedule-container">
						{schedule.map((item, index) => {
							// console.log(pendingReservations);
							var classN =
								parseInt(selected) === hours[index]
									? "schedule_item selected"
									: pendingReservations.includes(hours[index].toString())
									? "schedule_item pending"
									: "schedule_item";
							return (
								<div
									className={classN}
									value={hours[index]}
									onClick={clickItemHandle}
									key={index}
								>
									{item}
								</div>
							);
						})}
					</div>
					<div className="schedule-info">
						<h5 className="color-orange font-bold">- Rezervări în așteptare</h5>
						<h5 className="color-green font-bold">- Rezervări disponibile</h5>
						<h5 className="color-yellow font-bold">- Rezervarea dorită</h5>
					</div>
				</>
			);
		} else {
			return (
				<div className="no_free_spots">
					Nu mai sunt locuri disponibile pentru ziua selectată!
				</div>
			);
		}
	} else {
		console.log("Wrong start or end hour");
	}
};

function getFormatedData(date) {
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();
	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;

	const formattedDate = dd + "/" + mm + "/" + yyyy;

	return formattedDate;
}
