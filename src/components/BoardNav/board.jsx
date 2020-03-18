import React from "react";

// libraries
import { Link } from "react-router-dom";

// style
import { Item, Name } from "./board-nav-style";

const Board = ({ name, id, description }) => {
	return (
		<Item>
			<Link to={`/board/${id}`} title={description}>
				<Name>{name}</Name>
			</Link>
		</Item>
	);
};

export default Board;
