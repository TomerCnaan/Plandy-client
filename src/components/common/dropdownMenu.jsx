import React, { useState, useEffect } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FlagIcon from "@material-ui/icons/Flag";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#3F51B5",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#3F51B5",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "red",
			},
			"&:hover fieldset": {
				borderColor: "yellow",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#3F51B5",
			},
		},
	},
})(TextField);

const useStyles = makeStyles((theme) => ({
	item: {
		fontFamily: "Montserrat, sans-serif",
	},
}));

const DropdownMenu = ({
	options,
	handleUpdateCell,
	anchor,
	handleCloseMenu,
	handleAddOption,
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(anchor);
	const [textInput, setTextInput] = useState("");

	useEffect(() => {
		setAnchorEl(anchor);
	}, [anchor]);

	const handleClose = () => {
		setAnchorEl(null);
		handleCloseMenu();
	};

	const handleInput = (e) => {
		setTextInput(e.target.value);
	};

	return (
		<Menu
			anchorEl={anchorEl}
			getContentAnchorEl={null}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			transformOrigin={{ vertical: "top", horizontal: "center" }}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
			style={{ fontFamily: "Montserrat, sans-serif" }}
		>
			{options.map((option, index) => (
				<MenuItem key={index} onClick={() => handleUpdateCell(option)}>
					<ListItemIcon style={{ minWidth: "35px" }}>
						<FlagIcon style={{ fill: option.color }} />
					</ListItemIcon>
					<ListItemText primary={option.value} />
				</MenuItem>
			))}
			<MenuItem>
				<CssTextField
					// variant="outlined"
					// color="primary"
					// size="small"
					label="Add Option"
					value={textInput}
					onChange={handleInput}
					style={{ width: "140px" }}
				/>
				<IconButton size="small">
					<AddIcon fontSize="small" onClick={handleAddOption} />
				</IconButton>
			</MenuItem>
		</Menu>
	);
};

export default DropdownMenu;
