import React, { useState } from "react";

// components

// libraries
import { useDispatch } from "react-redux";

// actions
import { deleteGroup, reverseDeleteGroup } from "../../actions/boardActions";

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
import { toast } from "react-toastify";

const GroupMenu = ({ groupId, boardId, groupIndex, group }) => {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);

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
				color="default"
				size="small"
				onClick={handleClick}
			>
				<ArrowDropDownCircleIcon fontSize="small" color="action" />
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
			</Menu>
		</div>
	);
};

export default GroupMenu;
