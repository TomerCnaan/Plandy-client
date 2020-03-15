import React from "react";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";

const Board = ({ match }) => {
	console.log(match.params.id);
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
