import React from "react";

// libraries
import { useDispatch } from "react-redux";

// services
import taskService from "../../services/taskService";

// actions
import { addTask } from "../../actions/boardActions";

// style
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

const Add = styled.div`
	display: flex;
	margin-left: 20px;
`;

const AddTask = ({ boardId, groupId, groupIndex, permitted }) => {
	const dispatch = useDispatch();

	const handleAddTask = async () => {
		try {
			const { data: newTask } = await taskService.addTask(boardId, groupId);
			dispatch(addTask(boardId, groupIndex, newTask));
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<Add>
			<IconButton onClick={handleAddTask} disabled={!permitted}>
				<AddIcon fontSize="small" />
				<span style={{ fontSize: "14px", paddingRight: "3px" }}> Add</span>
			</IconButton>
		</Add>
	);
};

export default AddTask;
