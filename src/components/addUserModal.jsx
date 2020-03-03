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
import navAdd from "../images/nav-add.svg";

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

// ----------------------------------------

const INTITIAL_STATE = {
	email: ""
};

const AddUserModal = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const schema = {
		email: Joi.string()
			.required()
			.email()
			.label("Email")
	};

	const doSubmit = async (data, errors) => {
		try {
			await userService.sendInvitation(data);
			toast.success("🚀 The invitation was sent successfully!", {
				position: toast.POSITION.TOP_RIGHT
			});
			handleClose();
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				errors.email = ex.response.data;
				return { ...errors };
			}
		}
	};

	const { handleSubmit, renderInput, renderButton } = useForm(
		INTITIAL_STATE,
		schema,
		doSubmit
	);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Btn onClick={handleClickOpen} title="add user">
					<img src={navAdd} alt="team" width="40px" height="40px" />
				</Btn>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle style={{ color: "#f35f0c" }}>Invite a user</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To add a user to your company account on Plandy, you have to send
							an invite to the user's email.
						</DialogContentText>
						<form onSubmit={handleSubmit} noValidate>
							{renderInput("email", emailLabel, "Email")}
							{renderButton("INVITE", "modal-submit-btn")}
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</ThemeProvider>
	);
};

export default AddUserModal;
