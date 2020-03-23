import React from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";

// style
import styled from "styled-components";

const Container = styled.div`
	/* border: 1px solid green; */
	margin: 8px;
`;

const Name = styled.h5`
	padding: 8px;
`;

const Task = ({ task, index }) => {
	const { _id, name } = task;

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Name>{name}</Name>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
