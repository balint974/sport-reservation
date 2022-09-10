import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../../assets/firebase/firebase.utils";
import { Link } from "react-router-dom";
import no_image from "../../assets/images/no-photo-available.png";
import { Navigate } from "react-router-dom";

export default function SearchResults({ searchState }) {
	var fieldType = localStorage.getItem("fieldType");

	// var fieldAddress = localStorage.getItem("fieldAddress");
	fieldType = JSON.parse(fieldType);
	// fieldAddress = JSON.parse(fieldAddress);

	const [queryResults, setQueryResults] = useState(null);

	useEffect(() => {
		firestore.collection("facilities").onSnapshot((snapshot) => {
			var count = 0;
			snapshot.docs.map((doc) => {
				const facility = doc.data();
				const type = facility.fieldType.value;
				if (queryFieldType === type) {
					if (count === 0) {
						setQueryResults([facility]);
					} else {
						setQueryResults((prev) => [facility, ...prev]);
					}
					count++;
				}
				return facility;
			});
		});
	}, []);

	if (fieldType === null) {
		return <Navigate to="/" />;
	}

	const queryFieldType = fieldType.value;

	return (
		<>
			<div className="container mx-auto">
				<h1 className="text-center mt-10">Rezultatele căutării</h1>
				<div className="searchResults my-20 ">
					{queryResults
						? queryResults.map((facility, index) => {
								var image = facility.fieldImages[0] ?? no_image;
								return (
									<Link
										key={index + 2}
										to={"/facility/" + facility.authorId}
										className="link"
										state={{ facility }}
									>
										<div
											style={{
												backgroundImage: `url(${image})`,
											}}
											className="resultImage"
											key={index}
										></div>

										<h2 key={index + 1}>{facility.fieldName}</h2>
									</Link>
								);
						  })
						: "Nici un rezultat!"}
				</div>
			</div>
		</>
	);
}
