import React, { useState, useEffect } from "react";

// services
import boardService from "../../services/boardService";

// style
import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
// import styled from "styled-components";
import { toast } from "react-toastify";
import { Dropdown, Menu, MenuTitle, MenuItem } from "../style/menu-style";

const UserList = ({ boardId }) => {
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState(null);

	useEffect(() => {
		getUsers();
	}, [boardId]);

	const getUsers = async () => {
		try {
			const { data } = await boardService.getBoardUsers(boardId);
			setUsers(data);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<div
			tabIndex="0"
			onBlur={() => setOpen(false)}
			style={{ paddingRight: "25px" }}
		>
			<IconButton onClick={() => setOpen(!open)} title="users list">
				<GroupIcon />
			</IconButton>
			{open && (
				<Dropdown>
					<Menu>
						<MenuTitle>owner</MenuTitle>
						<MenuItem>{users.owner}</MenuItem>
						<MenuTitle>Editors</MenuTitle>
						{users.permitted &&
							users.permitted.map((user) => (
								<MenuItem key={user._id}> {user.name} </MenuItem>
							))}
						<MenuTitle>Viewers</MenuTitle>
						{users.readOnly &&
							users.readOnly.map((user) => (
								<MenuItem key={user._id}>{user.name}</MenuItem>
							))}
					</Menu>
				</Dropdown>
			)}
		</div>
	);
};

export default UserList;
