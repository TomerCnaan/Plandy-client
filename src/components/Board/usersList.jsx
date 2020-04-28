import React, { useState, useEffect } from "react";

// services
import boardService from "../../services/boardService";

// style
import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
import styled from "styled-components";
import { toast } from "react-toastify";

const Dropdown = styled.div`
	position: absolute;
	top: 90px;
	width: 250px;
	transform: translateX(-75%);
	background-color: #242526;
	border: 1px solid #474a4d;
	border-radius: 8px;
	padding: 1rem;
	overflow: hidden;
	transition: height 500ms ease;
	z-index: 10;
`;

const Menu = styled.div`
	width: 100%;
`;

const MenuTitle = styled.span`
	color: #a7a7a7;
	font-size: 12px;
	height: 25px;
	display: flex;
	align-items: center;
	transition: background 500ms;
	padding: 0.5rem;
	padding-bottom: 4px;
	border-bottom: 1px solid #474a4d;
`;

const MenuItem = styled.span`
	color: #dadce1;
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 8px;
	transition: background 500ms;
	padding: 0.5rem;
	:hover {
		background-color: #525357;
	}
`;

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
		<div tabIndex="0" onBlur={() => setOpen(false)}>
			<IconButton onClick={() => setOpen(!open)}>
				<GroupIcon />
			</IconButton>
			{open && (
				<Dropdown>
					<Menu>
						<MenuTitle>owner</MenuTitle>
						<MenuItem>{users.owner}</MenuItem>
						<MenuTitle>permitted users</MenuTitle>
						{users.permitted &&
							users.permitted.map((user) => (
								<MenuItem key={user._id}> {user.name} </MenuItem>
							))}
						<MenuTitle>read only users</MenuTitle>
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
// TODO: finish writing

export default UserList;
