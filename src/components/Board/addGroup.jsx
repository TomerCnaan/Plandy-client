import React from "react";

// libraries
import { useDispatch } from "react-redux";

// actions
import { addGroup } from "../../actions/boardActions";

// services
import groupService from "../../services/groupService";

// style
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

const AddGroup = ({ boardId }) => {
	const dispatch = useDispatch();

	const handleAddGroup = async () => {
		try {
			const { data: newGroup } = await groupService.addGroup(boardId);
			dispatch(addGroup(boardId, newGroup));
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<Button
			style={{ padding: "7px" }}
			variant="contained"
			size="small"
			color="primary"
			startIcon={<AddIcon />}
			onClick={handleAddGroup}
		>
			New Group
		</Button>
	);
};

export default AddGroup;
