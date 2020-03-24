import React from "react";

// components
import Column from "./column";

// libraries
import { useSelector } from "react-redux";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
`;

const ColumnList = ({ boardId }) => {
	const columnOrder = useSelector(
		state => state.boards.boardsData[boardId].column_order
	);

	return (
		<Container>
			{columnOrder.map((column, index) => (
				<Column key={index} column={column} />
			))}
		</Container>
	);
};

export default ColumnList;
