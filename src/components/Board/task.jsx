import React, { useState, useEffect, useRef } from "react";

// components
import Cell from "./cell";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

// actions
import { deleteTask } from "../../actions/boardActions";
import { setColumnWidth } from "../../actions/visibilityActions";

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
	/* border-right: 0.5px solid #dad3d3; */
	/* margin-left: 35px; */
	margin-bottom: 1.5px;
	/* transform: translate3d(20deg, 10deg, 10deg);
	will-change: transform; */
`;

const WrapName = styled.div`
	display: flex;
	/* flex-grow: 1; */
	flex-shrink: 0;
	height: 40px;
	min-width: 223px;
`;

const Name = styled.textarea`
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
	font-size: 14px;
	height: 28px;
	line-height: 25px;
	display: flex;
	align-self: center;
	padding: 1px 3px;
	color: #171717;
	background-color: #f5f6f8;
	border: 1px solid transparent;
	outline: 0;
	overflow: hidden;
	border-radius: 0;
	resize: none;
	white-space: nowrap;
	transition: background-color 300ms ease;
	:hover,
	:focus {
		border: 1px dashed lightblue;
		background-color: white;
	}
	:focus {
		flex-grow: 1;
	}
`;

const LeftEdge = styled.div`
	display: flex;
	flex-shrink: 0;
	width: 6px;
	background-color: ${(props) => props.fill};
	height: 38px;
	margin-right: 20px;
`;

const CellList = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	flex-shrink: 0;
	height: 40px;
`;

const Delete = styled.div`
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	width: 34.5px;
	height: 40px;
	background-color: ${(props) => (props.hovered ? "#f5f6f8" : "white")};
	/* opacity: ${(props) => (props.hovered ? "1" : "0")}; */
	transition: background-color 250ms linear;
`;

const Task = ({
	task,
	index,
	color,
	boardId,
	groupId,
	group,
	groupIndex,
	permitted,
}) => {
	const { _id, name, column_values } = task;
	const column_order = useSelector(
		(state) => state.boards.boardsData[boardId].column_order
	);

	const dispatch = useDispatch();
	const [nameValue, setNameValue] = useState(name);
	const [isHovered, setIsHovered] = useState(false);
	const widthRef = useRef(null);

	const amount = useSelector((state) => state.visibility.columnAmount);
	useEffect(() => {
		dispatch(setColumnWidth(widthRef.current.offsetWidth, amount));
	}, [widthRef.current]);

	const handleTaskDelete = async () => {
		const originalTasksList = group.tasks; //save original data
		const tasksList = group.tasks.filter((t) => t._id !== _id); //remove current task
		dispatch(deleteTask(boardId, groupIndex, tasksList)); //set store with new tasks list

		try {
			await taskService.deleteTask(boardId, groupId, _id); //call server
			toast.success("The task has been deleted 🚀");
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}

			// something went wrong - return to data before delete
			dispatch(deleteTask(boardId, groupIndex, originalTasksList));
		}
	};

	const handleChange = (e) => {
		setNameValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		const originalName = name;
		// dispatch(updateGroupTitle(boardId, index, nameValue));

		try {
			await taskService.changeName(boardId, groupId, _id, nameValue);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
			setNameValue(originalName);
			// dispatch(updateGroupTitle(boardId, index, originalName));
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
							disabled={!permitted}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Delete>
					<LeftEdge fill={color}></LeftEdge>
					<WrapName>
						<Name
							rows="1"
							wrap="off"
							spellCheck="false"
							value={nameValue}
							onChange={handleChange}
							onKeyDown={handleKeyPress}
							onBlur={handleSubmit}
						>
							{name}
						</Name>
					</WrapName>

					<CellList ref={widthRef}>
						{column_order.map((column, index) => {
							const boardColumnId = column._id;
							const value = column_values.find(
								(x) => x.boardColumn === boardColumnId
							);

							return (
								<Cell
									key={index}
									data={value}
									boardColumn={column}
									boardId={boardId}
									groupId={groupId}
									taskId={_id}
									permitted={permitted}
								/>
							);
						})}
					</CellList>
					<div style={{ display: "flex", width: "26px", height: "40px" }}></div>
					<div
						style={{
							display: "flex",
							width: "3px",
							backgroundColor: "#dad3d3",
							height: "40px",
						}}
					></div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
