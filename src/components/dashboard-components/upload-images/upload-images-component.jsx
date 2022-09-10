import { useState, useEffect } from "react";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	deleteObject,
} from "firebase/storage";
import { Cancel } from "@mui/icons-material";
import { storage } from "../../../assets/firebase/firebase.utils";
import { v4 } from "uuid";
import "./upload-images-style.scss";

function ImagesUpload({ userId }) {
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const [imagesPath, setImagesPath] = useState([]);

	// console.log("id" + userId);

	const imagesListRef = ref(storage, `facilities-images/${userId}/`);
	const uploadFile = () => {
		if (imageUpload == null) return;
		const imageRef = ref(
			storage,
			`facilities-images/${userId}/${imageUpload.name + v4()}`
		);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [url, ...prev]);
			});
		});
	};

	const deleteFile = (index) => {
		let pictureRef = ref(storage, imagesPath[index]);
		console.log(imagesPath[index]);
		deleteObject(pictureRef)
			.then(() => {
				setImageUrls(function (prev) {
					prev.splice(index, 1);
					return prev;
				});
				setImagesPath(function (prev) {
					prev.splice(index, 1);
					return prev;
				});
				// window.location.reload();
				console.log("Imagine stearsa!");
				alert('Imagine stearsa!');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		listAll(imagesListRef).then((response) => {
			response.items.forEach((item) => {
				setImagesPath((prev) => [...prev, item._location.path_]);

				getDownloadURL(item).then((url) => {
					setImageUrls((prev) => [url, ...prev]);
				});
			});
		});
	}, []);

	return (
		<div id="images_upload" className="images_upload">
			<input
				type="file"
				onChange={(event) => {
					setImageUpload(event.target.files[0]);
				}}
			/>
			<button type="button" onClick={uploadFile}>
				{" "}
				Upload Image
			</button>
			<div className="uploaded_image_container">
				{imageUrls.map((url, index) => {
					return (
						<div className="uploaded_image" data-id={index} key={index + 1}>
							<img src={url} alt="" key={index} />
							<Cancel onClick={() => deleteFile(index)} key={index + 2} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ImagesUpload;
