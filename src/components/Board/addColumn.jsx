import React from "react";

// libraries
import { useDispatch } from "react-redux";

// actions
import { addColumn } from "../../actions/boardActions";

// services
import columnService from "../../services/columnService";

// style
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { toast } from "react-toastify";

const AddColumn = (props) => {
	const { column, boardId } = props;

	const dispatch = useDispatch();

	const handleAddColumn = async () => {
		try {
			const { data: newColumn } = await columnService.createBoardColumn(
				boardId,
				column._id
			);
			dispatch(addColumn(boardId, newColumn));
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<MenuItem onClick={handleAddColumn}>
			<ListItemText primary={column.type} />
		</MenuItem>
	);
};

export default AddColumn;
