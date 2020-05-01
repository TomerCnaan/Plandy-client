import React, { useState, useEffect } from "react";

// libraries
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { deleteBoard, changeType } from "../../actions/boardActions";

// services
import boardService from "../../services/boardService";

// style
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { toast } from "react-toastify";

const Settings = ({ boardId, boardsList, owner }) => {
	const dispatch = useDispatch();
	const boardType = useSelector(
		(state) => state.boards.boardsData[boardId].type
	);
	const [open, setOpen] = useState(false);
	const [selectedType, setSelectedType] = useState(boardType);

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteBoard = async () => {
		const result = window.confirm(
			"Are you sure that you want to delete this board?"
		);
		if (result) {
			const originalBoardsList = _.cloneDeep(boardsList);
			const originalBoard = _.find(boardsList, { _id: boardId });
			const originalIndex = _.findIndex(boardsList, { _id: boardId });
			const newBoardsList = _.cloneDeep(boardsList);
			newBoardsList.splice(originalIndex, 1);
			dispatch(deleteBoard(boardId, newBoardsList, originalBoard));

			try {
				await boardService.deleteBoard(boardId);
				toast.success("The board has been deleted 🗑️");
				window.location = "/home-page";
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}
				dispatch(deleteBoard(boardId, originalBoardsList, originalBoard));
			}
		}
	};

	const handleTypeChange = async (e) => {
		const originalType = selectedType;
		console.log(e.target.value);
		setSelectedType(e.target.value);

		dispatch(changeType(boardId, e.target.value));

		const result = window.confirm(
			"Are you sure that you want to change the type of the board?"
		);

		if (result) {
			try {
				console.log(e.target.value);
				await boardService.changeBoardType(e.target.value, boardId);
				toast.success("The board type has been changed 😎");
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}

				dispatch(changeType(boardId, originalType));
			}
		} else setSelectedType(boardType);
	};

	return (
		<div>
			<IconButton
				aria-label="settings"
				onClick={() => setOpen(!open)}
				disabled={!owner}
				title="settings"
			>
				<SettingsIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: "#242526",
						border: "1px solid #474a4d",
						color: "#dadce1",
					},
				}}
			>
				<DialogTitle>Settings</DialogTitle>
				<DialogContent>
					<FormControl
						component="fieldset"
						style={{ marginBottom: "40px", color: "#dadce1" }}
					>
						<FormLabel component="legend" style={{ color: "#dadce1" }}>
							Type
						</FormLabel>
						<RadioGroup
							aria-label="type"
							name="types"
							value={selectedType}
							onChange={handleTypeChange}
						>
							<FormControlLabel
								value="public"
								control={<Radio />}
								label="Public"
							/>
							<FormControlLabel
								value="private"
								control={<Radio />}
								label="Private"
							/>
						</RadioGroup>
					</FormControl>
					<br />
					Delete Board:
					<Button
						size="small"
						style={{ marginLeft: "20px" }}
						variant="contained"
						color="secondary"
						startIcon={<DeleteIcon />}
						onClick={() => handleDeleteBoard()}
					>
						Delete
					</Button>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Settings;
