import React, { useState } from "react";

// components
import Cell from "./cell";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

// actions
import { deleteTask } from "../../actions/boardActions";

// services
import taskService from "../../services/taskService";

// style
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";

const Container = styled.div`
	/* border: 1px solid green; */
	display: flex;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 0;
	background-color: #f5f6f8;
	border-right: 0.5px solid #dad3d3;
	/* margin-left: 35px; */
	margin-bottom: 1.5px;
	/* transform: translate3d(20deg, 10deg, 10deg);
	will-change: transform; */
`;

const Name = styled.h5`
	font-weight: 500;
	/* padding: 8px; */
	font-size: 14px;
	color: #171717;
`;

const LeftEdge = styled.div`
	width: 6px;
	background-color: ${(props) => props.fill};
	height: 38px;
	margin-right: 20px;
`;

const CellList = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	width: 140px;
	height: 40px;
`;

const Delete = styled.div`
	display: flex;
	justify-content: center;
	width: 34.5px;
	height: 40px;
	background-color: ${(props) => (props.hovered ? "#f5f6f8" : "white")};
	/* opacity: ${(props) => (props.hovered ? "1" : "0")}; */
	transition: background-color 250ms linear;
`;

const Task = ({ task, index, color, boardId, groupId, group, groupIndex }) => {
	const { _id, name, column_values } = task;
	const column_order = useSelector(
		(state) => state.boards.boardsData[boardId].column_order
	);

	const dispatch = useDispatch();

	const [isHovered, setIsHovered] = useState(false);

	const handleTaskDelete = async () => {
		const originalTasksList = group.tasks;
		const tasksList = group.tasks.filter((t) => t._id !== _id);
		dispatch(deleteTask(boardId, groupIndex, tasksList));

		try {
			await taskService.deleteTask(boardId, groupId, _id);
			toast.success("The task has been deleted 🚀");
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}

			dispatch(deleteTask(boardId, groupIndex, originalTasksList));
		}
	};

	return (
		<Draggable draggableId={_id} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isDragging={snapshot.isDragging}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Delete hovered={isHovered}>
						<IconButton
							size="small"
							style={{
								display: "flex",
								opacity: `${Number(isHovered)}`,
								transition: "500ms ease",
							}}
							onClick={handleTaskDelete}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Delete>
					<LeftEdge fill={color}></LeftEdge>
					<Name>{name}</Name>

					<CellList>
						{column_order.map((column, index) => {
							const type = column.columnType.type;
							const value = column_values.find(
								(x) => x.columnType.type === type
							);

							return <Cell key={index} data={value} />;
						})}
					</CellList>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
