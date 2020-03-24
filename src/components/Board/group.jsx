import React from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";

// components
import Tasks from "./tasks";
import ColumnList from "./columnList";

// style
import styled from "styled-components";
import GripDrag from "../../images/grip-group.svg";

const Container = styled.div`
	display: flex;
	align-self: flex-start;
	flex-flow: column nowrap;
	min-height: 50px;
	width: 1100px;
	margin: 8px;
	/* border: 1px solid lightgray;
	border-radius: 5px; */
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.h3`
	padding: 9px;
`;

const Span = styled.span`
	padding: 9px;
`;

const Group = ({ group, index, boardId }) => {
	const { _id, title, tasks } = group;

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef} {...provided.draggableProps}>
					<Header>
						<Span {...provided.dragHandleProps}>
							<img src={GripDrag} alt="grip" />
						</Span>
						<Title>{title}</Title>

						<ColumnList boardId={boardId} />
					</Header>

					<Tasks tasks={tasks} groupIndex={index.toString()} />
				</Container>
			)}
		</Draggable>
	);
};

export default Group;
