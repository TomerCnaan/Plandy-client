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
	display: flex;
	padding: 9px;
	text-align: "center";
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	display: flex;
	background: ${props => props.groupColor};
`;

const Group = ({ group, index, boardId }) => {
	const { _id, title, tasks } = group;
	console.log(group.color);

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef} {...provided.draggableProps}>
					<Header>
						<Span groupColor={group.color} {...provided.dragHandleProps}>
							<Img src={GripDrag} alt="grip" /> //TODO: change color of group
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
