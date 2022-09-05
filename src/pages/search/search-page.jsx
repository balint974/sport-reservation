import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../components/header/header-component";
import { Footer } from "../../components/footer/footer-component";
import SearchResults from "../../components/search-results/search-results-component";

import "./search-page-style.scss";

export default function SearchPage({ currentUser }) {
	const searchState = useLocation().state;

	return (
		<div className="search">
			<Header currentUser={currentUser} />
			<SearchResults searchState={searchState} />
			<Footer />
		</div>
	);
}
