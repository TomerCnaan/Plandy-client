import React from "react";

// components
import Column from "./column";

// libraries
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	align-items: flex-end;
`;

const ColumnList = ({ boardId, groupIndex, groupName }) => {
	const columnOrder = useSelector(
		(state) => state.boards.boardsData[boardId].column_order
	);

	return (
		<Droppable
			droppableId={groupName}
			type={`COLUMNS-${groupIndex}`}
			direction="horizontal"
		>
			{(provided, snapshot) => (
				<Container {...provided.droppableProps} ref={provided.innerRef}>
					{columnOrder.map((column, index) => {
						const columnId = column._id;
						return (
							<Column
								key={columnId}
								column={column}
								index={index}
								groupName={groupName}
							/>
						);
					})}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default ColumnList;
