import React from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	position: relative;
	width: 140px;
	height: 40px;
	:hover {
		background-color: #f5f5f5;
		border: 0.5px solid #dad3d3;
		border-bottom: 0;
		border-radius: 10px 10px 0px 0px;
	}
`;

const Column = ({ column, index, groupName }) => {
	const { name } = column;

	return (
		<Draggable draggableId={`${groupName}-${name}`} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{name}
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
