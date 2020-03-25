import React from "react";

// libraries
import { Droppable } from "react-beautiful-dnd";

// components
import Task from "./task";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	min-height: 40px;

	/* border: 1px solid skyblue; */
`;

const Tasks = ({ tasks, groupIndex, color }) => {
	return (
		<Droppable droppableId={groupIndex} type="TASKS">
			{(provided, snapshot) => (
				<Container {...provided.droppableProps} ref={provided.innerRef}>
					{tasks.map((task, index) => {
						const taskId = task._id;

						return (
							<Task key={taskId} task={task} index={index} color={color} />
						);
					})}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default Tasks;
