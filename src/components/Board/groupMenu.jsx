import React, { useState } from "react";

// components

// libraries
import { useDispatch } from "react-redux";
import { ChromePicker } from "react-color";

// actions
import {
	deleteGroup,
	reverseDeleteGroup,
	changeGroupColor,
} from "../../actions/boardActions";

// services
import groupService from "../../services/groupService";

// style
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import styled from "styled-components";
import { toast } from "react-toastify";

const Popover = styled.div`
	position: absolute;
	z-index: 100;
	left: 40%;
`;

const Cover = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
`;

const GroupMenu = ({
	groupId,
	boardId,
	groupIndex,
	group,
	color,
	originalColor,
	handleColorChange,
	owner,
}) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [displayPicker, setDisplayPicker] = useState(false);

	const closePicker = async () => {
		setDisplayPicker(false);

		dispatch(changeGroupColor(boardId, groupIndex, color));

		try {
			await groupService.updateGroupColor(boardId, groupId, color);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}

			dispatch(changeGroupColor(boardId, groupIndex, originalColor));
		}
	};

	const openPicker = () => {
		setDisplayPicker(!displayPicker);
		setAnchorEl(null);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteGroup = async () => {
		dispatch(deleteGroup(boardId, groupIndex));
		try {
			await groupService.deleteGroup(boardId, groupId);
			toast.success("The group has been deleted 🚀");
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error("Group failed to be deleted 🤬");
			}

			dispatch(reverseDeleteGroup(boardId, groupIndex, group));
		}
	};

	return (
		<div style={{ display: "flex" }}>
			<IconButton
				aria-label="dropdown"
				// color="default"
				size="small"
				onClick={handleClick}
				disabled={!owner}
			>
				<ArrowDropDownCircleIcon
					fontSize="small"
					color="action"
					style={{ fill: color }}
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
				<MenuItem onClick={handleDeleteGroup}>
					<ListItemIcon>
						<DeleteForeverIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Delete Group" />
				</MenuItem>
				<MenuItem onClick={openPicker}>
					<ListItemIcon>
						<ColorLensIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Group Color" />
				</MenuItem>
			</Menu>
			{displayPicker ? (
				<Popover>
					{" "}
					<Cover onClick={closePicker} />{" "}
					<ChromePicker
						color={color}
						onChange={(color) => handleColorChange(color.hex)}
					/>{" "}
				</Popover>
			) : null}
		</div>
	);
};

export default GroupMenu;
