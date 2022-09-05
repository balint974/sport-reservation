import React from "react";
import ADVANCED_SEARCH from "../advanced-search/advanced-search-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./banner-style.css";

export const Banner = (props) => (
	<div className="flex flex-col">
		<div className="w-full bg-cover bg-center banner-container">
			<div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
				<div className="text-center">
					<ADVANCED_SEARCH />
				</div>
			</div>
		</div>
		<div className="w-full custom-info">
			<div className="container mx-auto flex justify-between">
				<div className="custom-item flex justify-between align-center">
					<FontAwesomeIcon icon={solid("magnifying-glass")} />
					<p className="custom-text">Găsește facilități sportive</p>
				</div>
				<FontAwesomeIcon icon={solid("caret-right")} />
				<div className="custom-item flex justify-between">
					<FontAwesomeIcon icon={solid("calendar-days")} />
					<p className="custom-text">
						Rezervă online sau verifică disponibilitatea
					</p>
				</div>
				<FontAwesomeIcon icon={solid("caret-right")} />
				<div className="custom-item flex justify-between">
					<FontAwesomeIcon icon={solid("child-reaching")} />
					<p className="custom-text">Bucură-te de joc</p>
				</div>
			</div>
		</div>
	</div>
);
