import { useState, useEffect } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function GooglePlaces({ setGoogleData, googlePlaceValue }) {
	const [data, setData] = useState("");

	useEffect(() => {
		if (data === "") {
			setData("");
		} else {
			setData(data);
			setGoogleData(data);
		}
	}, [data]);

	const apiOptions = { language: "ro", region: "ro" };

	// console.log("id" + userId);

	return (
		<>
			{/* {console.log(data)} */}
			<GooglePlacesAutocomplete
				apiKey="AIzaSyBdzcAO7MbizDzv02ZcQWh-r-qjnokQl10"
				apiOptions={apiOptions}
				autocompletionRequest={{
					componentRestrictions: {
						country: ["ro"],
					},
				}}
				selectProps={{
					value: googlePlaceValue, //set default value
					onChange: setData, //save the value gotten from google
					placeholder: "Introdu adresa unității sportive",
				}}
			/>
		</>
	);
}

export default GooglePlaces;
