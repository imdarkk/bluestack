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
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
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

	const templateCalendar = () => {
		return (
			// Add code to style custom calendar
			<div>
				<input id="CustomerName" name="CustomerName" class="e-field e-input" type="text" placeholder="Customer Name" />
				<input id="Address" name="Address" class="e-field e-input" type="text" placeholder="Address" />
				<input id="Phone" name="Phone" class="e-field e-input" type="text" placeholder="Phone #" />
				<DateTimePickerComponent id="Time" format='dd/MM/yy hh:mm a' data-name="Time" value={new Date()} className="e-field"></DateTimePickerComponent>
				<DropDownListComponent id="Status" placeholder='Choose status' data-name='Status' className="e-field" style={{ width: '100%' }}
					dataSource={['Active', 'Pending', 'Closed']}></DropDownListComponent>
			</div>
		)
	}

	return (
		<Container bg="#10151A" maxW="100vw" color="white">
			<HamburgerButton />
			<ScheduleComponent eventSettings={{ dataSource: dataManager }} editorTemplate={templateCalendar}>
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
