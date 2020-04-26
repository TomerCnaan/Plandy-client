import React, { useState, useEffect } from "react";

// libraries
import { useDispatch } from "react-redux";

// actions
import { addGroup } from "../../actions/boardActions";

// services
import groupService from "../../services/groupService";
import authService from "../../services/authService";

// style
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

const AddGroup = ({ boardId, ownerId }) => {
	const dispatch = useDispatch();
	const [isOwner, setIsOwner] = useState(false);

	useEffect(() => {
		const { _id } = authService.getCurrentUser();
		setIsOwner(_id === ownerId ? true : false);
	}, []);

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
			disabled={!isOwner}
		>
			New Group
		</Button>
	);
};

export default AddGroup;
