import React from "react";

// libraries
import { Link } from "react-router-dom";

// components
import AddBoardModal from "../addBoardModal";

// style
import { SliderContent, Header, Title } from "./board-nav-style";

const BoardNav = () => {
	return (
		<SliderContent>
			<Header>
				<Title>Boards</Title>
				<AddBoardModal />
			</Header>
		</SliderContent>
	);
};

export default BoardNav;