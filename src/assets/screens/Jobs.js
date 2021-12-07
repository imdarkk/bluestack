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
import { Container, Input } from "@chakra-ui/react";
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
			<Container>
				<input id="CustomerName" name="CustomerName" class="e-field e-input" type="text" placeholder="Customer Name" />
				<input id="Address" name="Address" class="e-field e-input" type="text" placeholder="Address" mt={4} />
				<input id="Phone" name="Phone" class="e-field e-input" type="text" placeholder="Phone #" mt={4} mb={4} />
				<DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date()} className="e-field"></DateTimePickerComponent>
				<DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date()} className="e-field"></DateTimePickerComponent>
				<DropDownListComponent id="Status" placeholder='Choose status' data-name='Status' className="e-field" style={{ width: '100%' }}
					dataSource={['Active', 'Pending', 'Closed']}></DropDownListComponent>
				<textarea id="Description" name="Description" class="e-field e-input e-description-textarea" type="text" placeholder="Description" mt={4} mb={4} />
			</Container>
		)
	}
	const eventTemplateF = (props) => {
		return (
			<div className="template-wrap">
      		<div className="subject">{props.CustomerName}</div>
      		<div className="subject">{props.Phone}</div>
      		<span className="from-event-template">{props.StartTime.getHours() + ":" + props.StartTime.getMinutes()}</span>
      		<div className="footer"></div></div>
    	);
	}

	const eventRenderedFunc = (e) => {
		switch(e.data.Status) {
			case 'Active':
				e.element.style.backgroundColor = "#37B36D";
				break;
			case 'Pending':
				e.element.style.backgroundColor = '#F57F17';
				break;
			case 'Closed':
				e.element.style.backgroundColor = '#cf4040';
				break;
			default:
				break;
		}
	}
	const popupOpen = (args) => {
		if (args.type === 'ViewEventInfo') {
			// Remove element with class e-subject-wrap
			let subjectWrap = document.getElementsByClassName('e-subject-wrap');
			subjectWrap[0].remove();

			let content = args.element.querySelector(".e-popup-content");
			let div = document.createElement("div");
			div.classList.add("content-wrapper");
			// CustomerName Address Phone Status Description
			Object.keys(args.data).forEach((key) => {
				// args.data[key]
				if (key == "CustomerName" || key == "Address" || key == "Phone" || key == "Status") {
					let p = document.createElement("p");
					p.classList.add("content-text");
					p.innerHTML = args.data[key];
					div.appendChild(p);
				}
			});
			content.appendChild(div);
		}
	}

	return (
		<Container bg="#10151A" maxW="100vw" color="white">
			<HamburgerButton />
			<ScheduleComponent eventSettings={{ dataSource: dataManager }} popupOpen={popupOpen} editorTemplate={templateCalendar} eventRendered={eventRenderedFunc}>
				<ViewsDirective>
					<ViewDirective
						option="WorkWeek"
						workDays={[1,2,3,4,5,6]}
						startHour="09:00"
						endHour="22:00"
						eventTemplate={eventTemplateF}
					/>
				</ViewsDirective>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
			{menu && <Navigation />}
		</Container>
	);
};

export default Jobs;
