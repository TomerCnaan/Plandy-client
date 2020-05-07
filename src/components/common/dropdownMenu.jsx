import React, { useState, useEffect } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FlagIcon from "@material-ui/icons/Flag";
import { makeStyles } from "@material-ui/core/styles";

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
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(anchor);

	useEffect(() => {
		setAnchorEl(anchor);
	}, [anchor]);

	const handleClose = () => {
		setAnchorEl(null);
		handleCloseMenu();
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
		</Menu>
	);
};

export default DropdownMenu;
