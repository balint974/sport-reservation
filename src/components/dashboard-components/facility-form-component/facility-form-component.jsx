import React from "react";
import Select from "react-select";
import ImagesUpload from "../upload-images/upload-images-component";
import GooglePlaces from "../../google-places/google-places-component";
import {
	storage,
	firestore,
	createFacilityDocument,
} from "../../../assets/firebase/firebase.utils";
import { ref, getDownloadURL, listAll } from "firebase/storage";

import "./facility-form-style.scss";

const fieldTypes = [
	{ value: "default", label: "Selectează un sport" },
	{ value: "fotbal", label: "Fotbal" },
	{ value: "tenis", label: "Tenis" },
];

class FacilityForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authorId: "",
			fieldName: "",
			fieldInfo: "",
			fieldType: "",
			fieldPhone: "",
			fieldImages: "",
			fieldAddress: "",
			fieldWorkingHours: "",
		};
	}

	setGoogleData = (data) => {
		this.setState({ fieldAddress: data });
	};

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		this.setImagesData();
		firestore
			.collection("facilities")
			.doc(this.props.currentUser.id)
			.onSnapshot((snapshot) => {
				var facility = snapshot.data();

				//reorder fieldType
				var value = facility.fieldType.value;
				var label = facility.fieldType.label;
				facility.fieldType = { value, label };

				this.setState(facility);
			});
	}

	setImagesData = () => {
		const imagesListRef = ref(
			storage,
			`facilities-images/${this.props.currentUser.id}/`
		);
		listAll(imagesListRef).then((response) => {
			var urls = [];
			var itemsProcessed = 0;
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					urls.push(url);
					itemsProcessed++;
					if (itemsProcessed === response.items.length) {
						this.setState({ fieldImages: urls });
					}
				});
			});
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setImagesData();
		const authorId = this.props.currentUser.id;
		this.state.authorId = authorId;

		const facility = this.state;

		console.log(facility);

		try {
			await createFacilityDocument(facility);
		} catch (error) {
			console.error(error.message);
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	textareaHandleChange = (e) => {
		this.setState({ fieldInfo: e.target.value });
	};

	selectHandleChange = (e) => {
		const value = e.value;
		const label = e.label;

		this.setState({ fieldType: { value, label } });
	};

	render() {
		return (
			<div className="create_facility">
				{/* {console.log(this.state)} */}
				<h1 className="title">Adaugă o unitate sportivă</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="fieldName">Numele unității sportive</label>
					<input
						type="text"
						name="fieldName"
						value={this.state.fieldName}
						required
						onChange={this.handleChange}
					/>

					<label htmlFor="fieldInfo">Descriere</label>
					<textarea
						required
						value={this.state.fieldInfo}
						onChange={this.textareaHandleChange}
					/>

					<label htmlFor="fieldType">Tipul de sport</label>
					<Select
						value={this.state.fieldType}
						onChange={this.selectHandleChange}
						options={fieldTypes}
					/>

					<label className="mt-4" htmlFor="fieldPhone">
						Telefon rezervări
					</label>
					<input
						type="text"
						name="fieldPhone"
						value={this.state.fieldPhone}
						required
						onChange={this.handleChange}
					/>

					<label className="mt-4" htmlFor="fieldWorkingHours">
						Program
					</label>
					<input
						type="text"
						name="fieldWorkingHours"
						value={this.state.fieldWorkingHours}
						required
						onChange={this.handleChange}
					/>

					<label htmlFor="google_places">Adauga adresa</label>
					<GooglePlaces
						setGoogleData={this.setGoogleData}
						googlePlaceValue={this.state.fieldAddress}
					/>

					<label htmlFor="images_upload">Adauga imagini</label>
					<ImagesUpload userId={this.props.currentUser.id} />

					<input type="submit" value="Actualizează informații" />
				</form>
			</div>
		);
	}
}
export default FacilityForm;
