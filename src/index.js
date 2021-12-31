import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./assets/auth/auth-context";
import { ChakraProvider } from "@chakra-ui/react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

ReactDOM.render(
	<ChakraProvider>
		<AuthProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<App />
			</LocalizationProvider>
		</AuthProvider>
	</ChakraProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
