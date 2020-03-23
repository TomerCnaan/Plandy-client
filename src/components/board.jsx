import React, { useEffect } from "react";

// libraries
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// actions
import { fetchBoardData } from "./../actions/boardActions";

// components
import Slider from "./slider";
import Spinner from "./common/spinner";
import Group from "./group";

// style
import { MainWrapper, MainContent } from "./style/main-app";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	border: 1px solid black;
	width: 100%;
	height: 100%;
`;

const Board = ({ match }) => {
	const boardId = match.params.id;
	const dispatch = useDispatch();
	const loading = useSelector(state => state.boards.isLoadingBoard);
	const boardData = useSelector(state => state.boards.boardsData[boardId]);

	useEffect(() => {
		dispatch(fetchBoardData(match.params.id));
	}, [match.params.id]);

	const onDragEnd = result => {
		console.log(result);
	};

	return (
		<MainWrapper>
			<Slider />
			{loading ? (
				<Spinner />
			) : (
				boardData && (
					<MainContent>
						<h1>{boardData.name}</h1>
						<h3>{boardData.description}</h3>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="all-groups">
								{provided => (
									<Container
										{...provided.droppableProps}
										innerRef={provided.innerRef}
									>
										{boardData.groups.map(group => {
											const groupId = group._id;

											return <Group key={groupId} group={group} />;
										})}
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
