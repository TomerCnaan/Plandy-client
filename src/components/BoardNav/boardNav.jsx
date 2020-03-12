import React from "react";

// libraries
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// components
import AddBoardModal from "../addBoardModal";

// style
import { SliderContent, Header, Title } from "./board-nav-style";

const BoardNav = () => {
	const user = useSelector(state => state.users.user);
	console.log(user);
	let role = "";
	if (user.role) role = user.role;
	return (
		<SliderContent>
			<Header>
				<Title>Boards</Title>
				{/* TODO: conditionaly render AddBoardModal - save user to redux store */}
				{role !== "member" && <AddBoardModal />}
			</Header>
		</SliderContent>
	);
};

export default BoardNav;
