import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const config = {
	apiKey: "AIzaSyBN5_YL7Cpa_Y8GKqnb-z3AEHYj6lvdP3w",
	authDomain: "sport-reservation-d0818.firebaseapp.com",
	projectId: "sport-reservation-d0818",
	storageBucket: "sport-reservation-d0818.appspot.com",
	messagingSenderId: "54599984423",
	appId: "1:54599984423:web:89fbc2c01864a52c883502",
};

const app = firebase.initializeApp(config);

// export const auth = firebase.auth();
export const storage = getStorage(app);
export const firestore = firebase.firestore();
export const db = app.firestore();

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userRef;
};

export const createFacilityDocument = async (facilityInfo) => {
	const facilityRef = firestore.doc(`facilities/${facilityInfo.authorId}`);

	const snapShot = await facilityRef.get();

	const {
		authorId,
		fieldName,
		fieldInfo,
		fieldType,
		fieldPhone,
		fieldImages,
		fieldAddress,
		fieldWorkingHours,
		startHours,
		endHours,
	} = facilityInfo;
	const createdAt = new Date();

	if (!snapShot.exists) {
		try {
			await facilityRef.set({
				authorId,
				fieldName,
				fieldInfo,
				fieldType,
				fieldPhone,
				fieldImages,
				fieldAddress,
				fieldWorkingHours,
				createdAt,
				startHours,
				endHours,
			});
			alert("Unitatea sportivă a fost adăugată!");
		} catch (error) {
			console.log("Error creating the facility", error.message);
		}
	} else {
		try {
			await facilityRef.update({
				authorId,
				fieldName,
				fieldInfo,
				fieldType,
				fieldPhone,
				fieldImages,
				fieldAddress,
				fieldWorkingHours,
				startHours,
				endHours,
			});
			alert("Unitatea sportivă a fost actualizată!");
		} catch (error) {
			console.log("Error updating the facility", error.message);
		}
	}

	return facilityRef;
};

export const createReservationEntry = async (reservationInfo) => {
	const reservationRequestAt = new Date();
	const name = reservationInfo.name;
	const time = reservationInfo.time;
	const date = reservationInfo.date;
	const email = reservationInfo.email;
	const userID = reservationInfo.currentUserId;
	const formattedDate = reservationInfo.formattedDate;
	const facilityData = reservationInfo.facilityData;
	const aproved = false;

	var reservationRef = "";

	//add time to reservation date
	date.setHours(0, 0, 0, 0);
	date.setSeconds(date.getSeconds() + parseInt(time) * 3600);

	try {
		reservationRef = await firestore
			.collection("facilities")
			.doc(reservationInfo.facilityUserId)
			.collection("reservations")
			.doc()
			.set({
				userID,
				name,
				time,
				date,
				email,
				reservationRequestAt,
				aproved,
				formattedDate,
				facilityData,
			});
	} catch (error) {
		console.log("Error creating the facility", error.message);
	}

	return reservationRef;
};

export const getFacilityDocumentByAuthorId = async (authorId) => {
	const facilityRef = firestore.doc(`facilities/${authorId}`);

	const snapShot = await facilityRef.get();

	if (snapShot.exists) {
		console.log("snap");
		return snapShot;
	}
	console.log("!snap");

	return facilityRef;
};

export const convertFacilitiesSnapshotToMap = (facilities) => {
	const transformedFacilities = facilities.docs.map((doc) => {
		console.log(doc.data());
		const {
			authorId,
			fieldAddress,
			fieldImages,
			fieldInfo,
			fieldName,
			fieldPhone,
			fieldType,
			fieldWorkingHours,
		} = doc.data();

		return {
			authorId,
			fieldAddress,
			fieldImages,
			fieldInfo,
			fieldName,
			fieldPhone,
			fieldType,
			fieldWorkingHours,
		};
	});
	console.log(transformedFacilities);
};

export default firebase;
