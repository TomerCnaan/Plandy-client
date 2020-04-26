import React, { useState, forwardRef, useEffect } from "react";

// components
import AddColumn from "./addColumn";

// services
import authService from "../../services/authService";

// style
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import Menu from "@material-ui/core/Menu";

const ColumnMenu = ({ columns, boardId, boardColumns, ownerId }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const [isOwner, setIsOwner] = useState(false);
	useEffect(() => {
		const { _id } = authService.getCurrentUser();
		setIsOwner(_id === ownerId ? true : false);
	}, []);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div
			style={{
				display: "flex",
				alignSelf: "flex-end",
				justifySelf: "center",
				flexShrink: "0",
			}}
		>
			<IconButton
				aria-label="dropdown"
				// color="default"
				size="small"
				onClick={handleClick}
				title="Add column"
				disabled={!isOwner}
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
				style={{ fontFamily: "Montserrat, sans-serif" }}
			>
				{columns.map((column, index) => (
					<AddColumn
						key={index}
						column={column}
						colAmount={boardColumns.length}
						boardId={boardId}
					/>
				))}
			</Menu>
		</div>
	);
};

export default ColumnMenu;
