import React from "react";

// components
import Cell from "./cell";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

// style
import styled from "styled-components";

const Container = styled.div`
	/* border: 1px solid green; */
	display: flex;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 0;
	background-color: #f5f5f5;
	border-right: 0.5px solid #dad3d3;
	margin-left: 35px;
	margin-bottom: 1.5px;
`;

const Name = styled.h5`
	font-weight: 500;
	/* padding: 8px; */
	font-size: 14px;
	color: #171717;
`;

const LeftEdge = styled.div`
	width: 6px;
	background-color: ${(props) => props.fill};
	height: 38px;
	margin-right: 20px;
`;

const CellList = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	width: 140px;
	height: 40px;
`;

const Task = ({ task, index, color, boardId }) => {
	const { _id, name, column_values } = task;
	const column_order = useSelector(
		(state) => state.boards.boardsData[boardId].column_order
	);

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isDragging={snapshot.isDragging}
				>
					<LeftEdge fill={color}></LeftEdge>
					<Name>{name}</Name>

					<CellList>
						{column_order.map((column, index) => {
							const type = column.columnType.type;
							const value = column_values.find(
								(x) => x.columnType.type === type
							);

							return <Cell key={index} data={value} />;
						})}
					</CellList>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
