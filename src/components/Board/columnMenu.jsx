import React, { useState } from "react";

// style
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const ColumnMenu = ({ columns }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddColumn = (e) => {
		console.log(e.target.value);
	};

	return (
		<div style={{ display: "flex" }}>
			<IconButton
				aria-label="dropdown"
				// color="default"
				size="small"
				onClick={handleClick}
				title="Add column"
			>
				<ArrowDropDownCircleOutlinedIcon
					fontSize="small"
					color="action"
					// style={{ fill: color }}
				/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{columns.map((column, index) => (
					<MenuItem key={index}>
						<ListItemText primary={column.type} />
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default ColumnMenu;
