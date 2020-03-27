import React from "react";

// components
import Column from "./column";

// libraries
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

// style
import styled from "styled-components";

const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	align-items: flex-end;
`;

const ColumnList = ({ boardId, groupIndex, groupName }) => {
	const columnOrder = useSelector(
		state => state.boards.boardsData[boardId].column_order
	);

	return (
		<Droppable droppableId={groupIndex} type="COLUMNS" direction="horizontal">
			{(provided, snapshot) => (
				<Container {...provided.droppableProps} ref={provided.innerRef}>
					{columnOrder.map((column, index) => (
						<Column
							key={index}
							column={column}
							index={index}
							groupName={groupName}
						/>
					))}
				</Container>
			)}
		</Droppable>
	);
};

export default ColumnList;
