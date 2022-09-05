import React from "react";
import "./home-content-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const HomeContent = (props) => (
	<div className="w-full">
		<section className="find__your_play">
			<div className="container mx-auto">
				<div className="section-heading flex flex-col justify-center">
					<h2>Găsește un teren de sport</h2>
					<p>
						Găsește facilități sportive de la terenuri de fotbal la terenuri de
						tenis în toată România
					</p>
				</div>
				<div className="section-content grid grid-cols-3 sport_cards gap-x-6">
					<div className="find_sport_card flex flex-col text-left">
						<div className="card_image"></div>
						<div className="card_title font-semibold my-2">
							<h3>Terenuri de sport în Bacău</h3>
						</div>
						<div className="card_content mb-2">
							Dacă doriți să practicați sport în Bacău, avem facilități pentru 9
							sporturi, inclusiv terenuri de fotbal, terenuri de badminton și
							terenuri de tenis.
						</div>
						<div className="card_button">
							<a href="google.com">Găsește teren de sport</a>
						</div>
					</div>
					<div className="find_sport_card flex flex-col text-left">
						<div className="card_image"></div>
						<div className="card_title font-semibold my-2">
							<h3>Terenuri de sport în Iași</h3>
						</div>
						<div className="card_content mb-2">
							Dacă doriți să practicați sport în Iași, avem facilități pentru 25
							sporturi, inclusiv terenuri de fotbal, terenuri de badminton și
							terenuri de tenis.
						</div>
						<div className="card_button">
							<a href="google.com">Găsește teren de sport</a>
						</div>
					</div>
					<div className="find_sport_card flex flex-col text-left">
						<div className="card_image"></div>
						<div className="card_title font-semibold my-2">
							<h3>Terenuri de sport în Cluj</h3>
						</div>
						<div className="card_content mb-2">
							Dacă doriți să practicați sport în Cluj, avem facilități pentru 35
							sporturi, inclusiv terenuri de fotbal, terenuri de badminton și
							terenuri de tenis.
						</div>
						<div className="card_button">
							<a href="google.com">Găsește teren de sport</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section>
			<div className="about_sport_reservation text-left">
				<div className="gradient_color">
					<div className="container mx-auto">
						<div className="section-title">
							<h2>Sport</h2>
							<h1>Reservation</h1>
						</div>
						<div className="checks-container">
							<div className="check">
								<FontAwesomeIcon icon={solid("check")} />
								<h4>Disponibil în Iași, Bacău și Cluj</h4>
							</div>
							<div className="check">
								<FontAwesomeIcon icon={solid("check")} />
								<h4>Vezi rezervările făcute în calendarul tău</h4>
							</div>
							<div className="check">
								<FontAwesomeIcon icon={solid("check")} />
								<h4>Caută 7 sporturi diferite cu ajutorul localizării</h4>
							</div>
							<div className="check">
								<FontAwesomeIcon icon={solid("check")} />
								<h4>Fă o rezervare instant</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div className="container mx-auto info_section grid grid-cols-3 gap-x-10">
				<div className="info_card flex flex-col">
					<FontAwesomeIcon icon={solid("magnifying-glass")} />
					<h2>Caută</h2>
					<div className="info_content">Căutați să jucați după muncă, să vă organizați echipa de fotbal? Explorați cea mai mare rețea de facilități sportive din România. Trebuie doar să introduceți locația dumneavoastră, să alegeți sportul și apăsați butonul de căutare.</div>
				</div>
				<div className="info_card flex flex-col">
					<FontAwesomeIcon icon={solid("calendar-days")} />
					<h2>Rezervă</h2>
					<div className="info_content">După ce ați găsit terenul, sala de sport sau clubul perfect, faceți rezervarea rapid și plata mai ușoară. Conectați-vă cu locația prin formularul de solicitare pentru a face o rezervare online. Lucrăm cu cele mai bune facilități sportive din România pentru a simplifica organizarea sportului.</div>
				</div>
				<div className="info_card flex flex-col">
					<FontAwesomeIcon icon={solid("child-reaching")} />
					<h2>Joacă-te</h2>
					<div className="info_content">Tu ești eroul, ai găsit un teren rezervat cu ușurință și acum este timpul să joci. Scena este pregătită pentru meciul tău epic, unde visele pot fi îndeplinite sau rupte. Durerea este doar temporară, dar victoria este pentru totdeauna, așa că nu lăsați nimic în urmă.</div>
				</div>
			</div>
		</section>
	</div>
);
