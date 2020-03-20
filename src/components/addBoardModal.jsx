import React, { useState } from "react";

// libraries
import { useDispatch } from "react-redux";
import { addBoardName } from "../actions/boardActions";
import Joi from "joi-browser";
import styled from "styled-components";
import { toast } from "react-toastify";

// components
import useForm from "./common/useForm";
import boardService from "../services/boardService";

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
import nameLabel from "../images/name-label.svg";

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
	padding-top: 1.5px;
	:hover {
		cursor: pointer;
	}
`;

// ----------------------------------------

const INTITIAL_STATE = {
	name: "",
	type: ""
};

// ----------------------------------------

const AddBoardModal = () => {
	const [open, setOpen] = useState(false);
	const [types, setTypes] = useState([
		{ _id: 1, name: "public" },
		{ _id: 2, name: "private" }
	]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const schema = {
		name: Joi.string()
			.required()
			.label("Name"),
		type: Joi.string()
			.required()
			.label("Label")
	};

	const dispatch = useDispatch();

	const doSubmit = async (data, errors) => {
		try {
			const board = await boardService.createBoard(data);
			dispatch(addBoardName(board.data));
			toast.success("🚀 The board was added successfully!", {
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

	const { handleSubmit, renderInput, renderButton, renderSelect } = useForm(
		INTITIAL_STATE,
		schema,
		doSubmit
	);

	return (
		<ThemeProvider theme={theme}>
			<Btn onClick={handleClickOpen} title="add board">
				<img src={Plus} alt="add board" width="25" height="25" />
			</Btn>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle style={{ color: "#f35f0c" }}>Add a board</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a board, peak a name and choose whether you want the board to
						be public to all company members or invite only.
					</DialogContentText>
					<form onSubmit={handleSubmit} noValidate>
						{renderInput("name", nameLabel, "Name")}
						{renderSelect("type", "Type", "Board Type", types)}
						{renderButton("ADD", "modal-submit-btn")}
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
};

export default AddBoardModal;
