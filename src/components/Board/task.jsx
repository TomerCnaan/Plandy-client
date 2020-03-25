import React from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";

// style
import styled from "styled-components";
import GripDrag from "../../images/grip-task.svg";

const Container = styled.div`
	/* border: 1px solid green; */
	display: flex;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 0;
	background-color: #f5f5f5;
	border: 0.5px solid #dad3d3;
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
	background-color: ${props => props.fill};
	height: 38px;
	margin-right: 20px;
`;

const Task = ({ task, index, color }) => {
	const { _id, name } = task;

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<LeftEdge fill={color}></LeftEdge>

					<Name>{name}</Name>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
