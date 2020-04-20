import React, { useState } from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

// actions
import { updateGroupTitle } from "../../actions/boardActions";

// services
import groupService from "../../services/groupService";

// components
import Tasks from "./tasks";
import ColumnList from "./columnList";
import GroupMenu from "./groupMenu";

// style
import styled from "styled-components";
import GripDrag from "../../images/grip-group.svg";
import { toast } from "react-toastify";

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

const WrapTitle = styled.div`
	display: flex;
	flex-grow: 1;
	flex-shrink: 0;
`;

const Title = styled.textarea`
	font-family: "Montserrat", sans-serif;
	height: 30px;
	min-width: 1px;
	/* width: auto; */
	display: flex;
	align-self: center;
	padding: 0 3px;
	font-weight: 700;
	font-size: 18.72px;
	line-height: 25.08px;
	color: ${(props) => props.groupColor};
	white-space: nowrap;
	border: 1px dashed transparent;
	outline: 0;
	overflow: hidden;
	border-radius: 0;
	resize: none;
	:hover,
	:focus {
		border: 1px dashed ${(props) => props.groupColor};
	}
	:focus {
		flex-grow: 1;
	}
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

	const dispatch = useDispatch();
	const [titleValue, setTitlenValue] = useState(title);

	const handleChange = (e) => {
		setTitlenValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		const originalTitle = title;
		dispatch(updateGroupTitle(boardId, index, titleValue));

		try {
			await groupService.updateGroupTitle(boardId, _id, titleValue);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
			setTitlenValue(originalTitle);
			dispatch(updateGroupTitle(boardId, index, originalTitle));
		}
	};

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef} {...provided.draggableProps}>
					<Header>
						<WrapTitle>
							<Span groupColor={group.color} {...provided.dragHandleProps}>
								<Img src={GripDrag} alt="grip" />
							</Span>{" "}
							<GroupMenu
								groupId={_id}
								boardId={boardId}
								groupIndex={index.toString()}
								group={group}
								color={group.color}
							/>
							<Title
								rows="1"
								wrap="off"
								groupColor={group.color}
								spellCheck="false"
								value={titleValue}
								onChange={handleChange}
								onKeyDown={handleKeyPress}
								onBlur={handleSubmit}
							>
								{title}
							</Title>
						</WrapTitle>
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
						group={group}
					/>
				</Container>
			)}
		</Draggable>
	);
};

export default Group;
