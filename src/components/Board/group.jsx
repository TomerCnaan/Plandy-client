import React from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

// components
import Tasks from "./tasks";
import ColumnList from "./columnList";
import GroupMenu from "./groupMenu";

// style
import styled from "styled-components";
import GripDrag from "../../images/grip-group.svg";

const Container = styled.div`
	display: flex;
	align-self: flex-start;
	flex-flow: column nowrap;
	min-height: 50px;
	/* width: 1100px; */
	width: 100%;
	/* margin: 8px; */
	padding: 8px;
	margin-bottom: 20px;
	padding-right: 50px;
	background-color: white;
	flex-shrink: 0;
	/* border: 1px solid lightgray;
	border-radius: 5px; */
`;

const Header = styled.div`
	display: flex;
	align-items: stretch;
`;

const Title = styled.h3`
	padding: 9px;
	color: ${(props) => props.groupColor};
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
`;

const Group = ({ group, index, boardId }) => {
	const { _id, title, tasks } = group;
	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef} {...provided.draggableProps}>
					<Header>
						<Span groupColor={group.color} {...provided.dragHandleProps}>
							<Img src={GripDrag} alt="grip" />
						</Span>{" "}
						<Title groupColor={group.color}>{title}</Title>
						<GroupMenu
							groupId={_id}
							boardId={boardId}
							groupIndex={index.toString()}
							group={group}
						/>
						<ColumnList
							boardId={boardId}
							groupIndex={index.toString()}
							groupName={group.title}
						/>
					</Header>

					<Tasks
						tasks={tasks}
						groupIndex={index.toString()}
						color={group.color}
						boardId={boardId}
						groupId={_id}
					/>
				</Container>
			)}
		</Draggable>
	);
};

export default Group;
