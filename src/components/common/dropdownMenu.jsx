import React, { useState, useEffect } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const DropdownMenu = ({
	options,
	handleUpdateCell,
	anchor,
	handleCloseMenu,
}) => {
	const [anchorEl, setAnchorEl] = useState(anchor);

	useEffect(() => {
		setAnchorEl(anchor);
	}, [anchor]);

	const handleClose = () => {
		setAnchorEl(null);
		console.log("handling close menu");
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
					<ListItemText primary={option.value} />
				</MenuItem>
			))}
		</Menu>
	);
};

export default DropdownMenu;
