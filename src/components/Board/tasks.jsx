import React from "react";

// libraries
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

// components
import Task from "./task";
import AddTask from "./addTask";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	flex-shrink: 0;
	min-height: 40px;
	/* border: ${(props) =>
		props.isDraggingOver ? "0.5px dashed black" : "none"}; */
	padding: ${(props) => (props.isDraggingOver ? "8px" : "0")};
	transition: 200ms ease;

	/* border: 1px solid skyblue; */
`;

const Tasks = ({
	tasks,
	groupId,
	groupIndex,
	color,
	boardId,
	group,
	permitted,
}) => {
	const searchQuery = useSelector((state) => state.search.searchQuery);
	let filteredTasks = tasks;
	if (searchQuery)
		filteredTasks = tasks.filter((t) =>
			t.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

	return (
		<Droppable droppableId={groupIndex} type="TASKS">
			{(provided, snapshot) => (
				<Container
					{...provided.droppableProps}
					ref={provided.innerRef}
					isDraggingOver={snapshot.isDraggingOver}
				>
					{filteredTasks &&
						filteredTasks.map((task, index) => {
							const taskId = task._id;

							return (
								<Task
									key={taskId}
									task={task}
									index={index}
									color={color}
									boardId={boardId}
									groupId={groupId}
									group={group}
									groupIndex={groupIndex}
									permitted={permitted}
								/>
							);
						})}
					{provided.placeholder}
					<AddTask
						boardId={boardId}
						groupId={groupId}
						groupIndex={groupIndex}
						permitted={permitted}
					/>
				</Container>
			)}
		</Droppable>
	);
};

export default Tasks;
