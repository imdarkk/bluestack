import React from "react";
import {
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	Inject,
	ViewsDirective,
	ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { useAuth } from "../auth/auth-context";
import { Container } from "@chakra-ui/react";
import "../styles/jobs.scss";

const Jobs = () => {
	const { menu } = useAuth();

	let dataManager = new DataManager({
		url: "https://backend.mariosk.xyz:3001/getJobs",
		crudUrl: "https://backend.mariosk.xyz:3001/updateJobs",
		crossDomain: true,
		adaptor: new UrlAdaptor(),
	});

	return (
		<Container bg="#10151A" maxW="100vw" color="white">
			<HamburgerButton />
			<ScheduleComponent eventSettings={{ dataSource: dataManager }}>
				<ViewsDirective>
					<ViewDirective
						option="Week"
						startHour="09:00"
						endHour="22:00"
					/>
				</ViewsDirective>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
			{menu && <Navigation />}
		</Container>
	);
};

export default Jobs;
