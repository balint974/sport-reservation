import Select from "react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import React from "react";
import { Link } from "react-router-dom";

import "./advanced-search-style.scss";
import "./advanced-search-script.js";

const options = [
	{ value: "default", label: "Selectează un sport" },
	{ value: "fotbal", label: "Fotbal" },
	{ value: "tenis", label: "Tenis" },
];

const apiOptions = { language: "ro", region: "ro" };

class ADVANCED_SEARCH extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldType: { value: "default", label: "Selectează un sport" },
			fieldAddress: "",
		};
	}

	selectHandleChange = (e) => {
		const value = e.value;
		const label = e.label;

		this.setState({ fieldType: { value, label } });
	};

	GooglePlacesHandel = (e) => {
		this.setState({ fieldAddress: e });
	};

	searchHandle = (e) => {
		if (this.state.fieldType.value === "default") {
			alert("Slecteaza un sport!");
			e.preventDefault();
		} else if (!this.state.fieldAddress) {
			alert("Introdu o adresa!");
			e.preventDefault();
		} else {
			localStorage.setItem("fieldType", JSON.stringify(this.state.fieldType));
			localStorage.setItem(
				"fieldAddress",
				JSON.stringify(this.state.fieldAddress)
			);
		}
	};

	render() {
		return (
			<div className="advanced-search-container">
				<h1 className="text-black text-xl font-semibold md:text-2xl">
					Rezervă o unitate sportivă în apropierea ta
				</h1>
				<Select
					options={options}
					defaultValue={this.state.fieldType}
					onChange={this.selectHandleChange}
				/>
				<div className="google_places">
					<GooglePlacesAutocomplete
						apiKey="AIzaSyBdzcAO7MbizDzv02ZcQWh-r-qjnokQl10"
						apiOptions={apiOptions}
						autocompletionRequest={{
							componentRestrictions: {
								country: ["ro"],
							},
						}}
						selectProps={{
							value: this.state.fieldAddress, //set default value
							onChange: this.GooglePlacesHandel, //save the value gotten from google
							placeholder: "Introduceți adresa unității sportive",
						}}
					/>
				</div>

				<Link
					onClick={this.searchHandle}
					to="/search"
					className="searchSubmit"
					state={this.state}
				>
					CAUTĂ
				</Link>
			</div>
		);
	}
}

export default ADVANCED_SEARCH;
