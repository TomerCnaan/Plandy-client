import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlagIcon from "@material-ui/icons/Flag";

const UseCellMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const renderMenu = (options, handleUpdate) => {
		return (
			<Menu
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={handleUpdate}>
						<ListItemIcon>
							<FlagIcon style={{ fill: option.color }} />
						</ListItemIcon>
						<ListItemText primary={option.value} />
					</MenuItem>
				))}
			</Menu>
		);
	};
};

export default UseCellMenu;
