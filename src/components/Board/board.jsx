import React, { useState, useEffect } from "react";

// libraries
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// actions
import { fetchBoardData } from "../../actions/boardActions";
import {
	setNewGroupsOrder,
	setNewColumnsOrder,
} from "../../actions/boardActions";

// components
import Slider from "../slider";
import Spinner from "../common/spinner";
import Group from "./group";
import BoardHeader from "./boardHeader";

// services
import groupService from "../../services/groupService";
import columnService from "../../services/columnService";
import taskService from "../../services/taskService";
import auth from "../../services/authService";

// style
import { MainWrapper, MainContent } from "../style/main-app";
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* border: 1px solid black; */
	/* width: 100%;
	height: 100%; */
	padding-left: 30px;
	flex-shrink: 0;
	flex-grow: 1;
`;

const Board = ({ match }) => {
	const boardId = match.params.id;
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.boards.isLoadingBoard);
	const boardData = useSelector((state) => state.boards.boardsData[boardId]);
	const userId = auth.getCurrentUser()._id;

	useEffect(() => {
		dispatch(fetchBoardData(match.params.id));
	}, [match.params.id]);

	const [isOwner, setIsOwner] = useState(false);
	const [isPermitted, setIsPermitted] = useState(false);

	useEffect(() => {
		if (boardData) {
			setIsOwner(userId === boardData.owner ? true : false);
			setIsPermitted(boardData.isPermitted);
		}
	}, [boardData]);

	const onDragEnd = (result) => {
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
		const newGroups = _.cloneDeep(boardData.groups);

		if (start === finish) {
			if (type === "GROUPS") {
				handleGroupReorder(
					boardData._id,
					originalGroups,
					newGroups,
					source,
					destination
				);
			} else if (type === "TASKS") {
				handleInnerTaskReorder(
					boardData._id,
					originalGroups,
					newGroups,
					source,
					destination
				);
			} else {
				//column order has changed
				const originalColumns = boardData.column_order;
				const newColumns = Array.from(boardData.column_order);

				handleColumnReorder(
					boardData._id,
					originalColumns,
					newColumns,
					source,
					destination
				);
			}

			return;
		} else if (type === "TASKS") {
			// task were moved to a different group
			handleOuterTaskReorder(
				boardData._id,
				originalGroups,
				newGroups,
				source,
				destination
			);
		}
	};

	const handleGroupReorder = async (
		boardId,
		originalGroups,
		newGroups,
		source,
		destination
	) => {
		const [removed] = newGroups.splice(source.index, 1);
		newGroups.splice(destination.index, 0, removed);
		dispatch(setNewGroupsOrder(boardId, newGroups));

		if (boardData.owner === userId) {
			try {
				await groupService.reorderGroups({ boardId, newGroups });
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}

				dispatch(setNewGroupsOrder(boardId, originalGroups));
			}
		}
	};

	const handleColumnReorder = async (
		boardId,
		originalColumns,
		newColumns,
		source,
		destination
	) => {
		const [removed] = newColumns.splice(source.index, 1);
		newColumns.splice(destination.index, 0, removed);
		dispatch(setNewColumnsOrder(boardId, newColumns));

		if (boardData.owner === userId) {
			try {
				await columnService.reorderColumns({ boardId, newColumns });
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}

				dispatch(setNewColumnsOrder(boardId, originalColumns));
			}
		}
	};

	const handleInnerTaskReorder = async (
		boardId,
		originalGroups,
		newGroups,
		source,
		destination
	) => {
		const groupIndex = Number(source.droppableId);
		const [removed] = newGroups[groupIndex].tasks.splice(source.index, 1);
		newGroups[groupIndex].tasks.splice(destination.index, 0, removed);
		dispatch(setNewGroupsOrder(boardId, newGroups));

		if (boardData.owner === userId) {
			try {
				const newTasks = newGroups[groupIndex].tasks;
				const groupId = newGroups[groupIndex]._id;
				await taskService.reorderInnerTasks({ boardId, groupId, newTasks });
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}

				dispatch(setNewGroupsOrder(boardId, originalGroups));
			}
		}
	};

	const handleOuterTaskReorder = async (
		boardId,
		originalGroups,
		newGroups,
		source,
		destination
	) => {
		const startGroupIndex = Number(source.droppableId);
		const endGroupIndex = Number(destination.droppableId);
		const newIndex = destination.index;
		const [removed] = newGroups[startGroupIndex].tasks.splice(source.index, 1);
		newGroups[endGroupIndex].tasks.splice(newIndex, 0, removed);
		dispatch(setNewGroupsOrder(boardData._id, newGroups));

		if (boardData.owner === userId) {
			try {
				const sourceGroupId = newGroups[startGroupIndex]._id;
				const destinationGroupId = newGroups[endGroupIndex]._id;
				const taskIdToMove = removed._id;
				await taskService.reorderOuterTasks({
					boardId,
					sourceGroupId,
					destinationGroupId,
					taskIdToMove,
					newIndex,
				});
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}

				dispatch(setNewGroupsOrder(boardId, originalGroups));
			}
		}
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
						<BoardHeader
							data={boardData}
							owner={isOwner}
							permitted={isPermitted}
						/>

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
													owner={isOwner}
													permitted={isPermitted}
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
