import React, { useState } from "react";

// libraries
import Joi from "joi-browser";
import styled from "styled-components";
import { toast } from "react-toastify";

// components
import useForm from "./common/useForm";
import userService from "../services/userService";

// style
import "./style/form-elements.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import emailLabel from "../images/email-label.svg";

// images
import Plus from "../images/plus-sign.svg";

// ----------------------------------------

const theme = createMuiTheme({
	typography: {
		fontFamily: "Montserrat, sans-serif"
	}
});

const Btn = styled.button`
	border: none;
	:hover {
		cursor: pointer;
	}
`;

const AddBoardModal = () => {
	return (
		<ThemeProvider theme={theme}>
			<Btn title="add board">
				<img src={Plus} alt="add board" width="25" height="25" />
			</Btn>
		</ThemeProvider>
	);
};

export default AddBoardModal;
