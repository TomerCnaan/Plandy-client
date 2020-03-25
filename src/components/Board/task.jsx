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
	background-color: #e6e6e6;
	border: 0.5px solid #dad3d3;
	margin-left: 35px;
`;

const Name = styled.h5`
	padding: 8px;
`;

const Span = styled.span`
	padding: 8px;
	padding-left: 5px;
	padding-right: 25px;
`;

const Task = ({ task, index }) => {
	const { _id, name } = task;

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef} {...provided.draggableProps}>
					<Span {...provided.dragHandleProps}>
						<img src={GripDrag} alt="grip" />
					</Span>
					<Name>{name}</Name>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
