import React, { useEffect } from "react";

// libraries
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// actions
import { fetchBoardData } from "../../actions/boardActions";
import { setNewGroupsOrder } from "../../actions/boardActions";

// components
import Slider from "../slider";
import Spinner from "../common/spinner";
import Group from "./group";
import BoardHeader from "./boardHeader";

// style
import { MainWrapper, MainContent } from "../style/main-app";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* border: 1px solid black; */
	width: 100%;
	height: 100%;
`;

const Board = ({ match }) => {
	const boardId = match.params.id;
	const dispatch = useDispatch();
	const loading = useSelector(state => state.boards.isLoadingBoard);
	const boardData = useSelector(state => state.boards.boardsData[boardId]);
	// const isPermitted = boardData.isPermitted TODO: send from server if client is permitted

	useEffect(() => {
		dispatch(fetchBoardData(match.params.id));
	}, [match.params.id]);

	const onDragEnd = result => {
		const { destination, source, type } = result;

		if (!destination) return;

		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		)
			return;

		const start = boardData.groups[source.droppableId];
		const finish = boardData.groups[destination.droppableId];

		const originalGroups = boardData.groups;
		const newGroups = Array.from(boardData.groups);

		if (start === finish) {
			if (type === "GROUPS") {
				const [removed] = newGroups.splice(source.index, 1);
				newGroups.splice(destination.index, 0, removed);
			} else if (type === "TASKS") {
				const groupIndex = Number(source.droppableId);
				const [removed] = newGroups[groupIndex].tasks.splice(source.index, 1);
				newGroups[groupIndex].tasks.splice(destination.index, 0, removed);
			}

			dispatch(setNewGroupsOrder(boardData._id, newGroups));
			return;
		}

		const startGroupIndex = Number(source.droppableId);
		const endGroupIndex = Number(destination.droppableId);
		const [removed] = newGroups[startGroupIndex].tasks.splice(source.index, 1);
		newGroups[endGroupIndex].tasks.splice(destination.index, 0, removed);

		dispatch(setNewGroupsOrder(boardData._id, newGroups));
	};

	return (
		<MainWrapper>
			<Slider />
			{loading ? (
				<MainContent>
					<Spinner />
				</MainContent>
			) : (
				boardData && (
					<MainContent>
						<BoardHeader data={boardData} />

						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="all-groups" type="GROUPS">
								{(provided, snapshot) => (
									<Container
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{boardData.groups.map((group, index) => {
											const groupId = group._id;

											return (
												<Group
													key={groupId}
													group={group}
													index={index}
													boardId={boardData._id}
												/>
											);
										})}
										{provided.placeholder}
									</Container>
								)}
							</Droppable>
						</DragDropContext>
					</MainContent>
				)
			)}
		</MainWrapper>
	);
};

export default Board;
