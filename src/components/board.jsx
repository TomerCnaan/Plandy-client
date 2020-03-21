import React, { useEffect } from "react";

// libraries
import { useDispatch } from "react-redux";

// actions
import { fetchBoardData } from "./../actions/boardActions";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";

const Board = ({ match }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBoardData(match.params.id));
	}, []);

	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<h1>Board</h1>
			</MainContent>
		</MainWrapper>
	);
};

export default Board;
