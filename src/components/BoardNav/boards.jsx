import React from "react";

// libraries
import { useSelector } from "react-redux";

// components
import Board from "./board";

// style
import { Items } from "./board-nav-style";

const Boards = ({ query }) => {
	const boardsList = useSelector(state => state.boards.boardsList);

	let filteredBoards = boardsList;
	if (query)
		filteredBoards = boardsList.filter(b =>
			b.name.toLowerCase().startsWith(query.toLowerCase())
		);

	return (
		<Items>
			{filteredBoards.map(board => (
				<Board
					key={board._id}
					name={board.name}
					id={board._id}
					description={board.description}
				/>
			))}
			<hr style={{ marginTop: "30px", border: "0.5px solid #E1E1E1" }} />
		</Items>
	);
};

export default Boards;
