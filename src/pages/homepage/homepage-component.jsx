import React from "react";
import { Header } from "../../components/header/header-component";
import { Banner } from "../../components/banner/banner-component";
import { HomeContent } from "../../components/home-content/home-content-component";
import { Footer } from "../../components/footer/footer-component";

export const Homepage = ({ currentUser }) => (
	<div className="App">
		<Header currentUser={currentUser} />
		<Banner />
		<HomeContent />
		<Footer />
	</div>
);
