import React from "react";
import "../styles/carcard.scss";

const Cars = (props) => {
	const handleDelete = () => {
		(async () => {
			const rawResponse = await fetch(
				`http://back.backend.mariosk.xyz:3001/delete/car/${props.license}`
			);
			const content = await rawResponse.json();
			if (content.status == 200) {
				window.location.reload();
			}
		})();
	};

	return (
		<div className="car-card">
			<p className="delete-car-btn" onClick={handleDelete}>
				Delete
			</p>
			<p>
				<b>License: </b>
				{props.license}
			</p>
			<p>
				<b>Fuel: </b>
				{props.fuel.charAt(0).toUpperCase() + props.fuel.slice(1)}
			</p>
			<p>
				<b>Transmission: </b>
				{props.transmission == "auto" ? "Automatic" : "Manual"}
			</p>
			<div className="status-wrapper">
				<p>
					<b>Status: </b>
					{props.status.charAt(0).toUpperCase() +
						props.status.slice(1)}
				</p>
				<div
					className={
						props.status === "active"
							? "status green"
							: "status red"
					}
				></div>
			</div>
		</div>
	);
};

export default Cars;
