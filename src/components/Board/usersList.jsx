import React, { useState, useEffect } from "react";

// services
import boardService from "../../services/boardService";

const UserList = (boardId) => {
	const [users, setUsers] = useState({});

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const { data } = await boardService.getBoardUsers(boardId);
		setUsers(data);
	};

	return (
		<div>
			<h5>{users}</h5>
		</div>
	);
};
// TODO: finish writing

export default UserList;
