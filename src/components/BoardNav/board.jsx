import React from "react";

// libraries
import { Link } from "react-router-dom";

// style
import { Item, Name } from "./board-nav-style";

const Board = ({ name, id }) => {
	return (
		<Item>
			<Link to={`/board/${id}`}>
				<Name>{name}</Name>
			</Link>
		</Item>
	);
};

export default Board;
