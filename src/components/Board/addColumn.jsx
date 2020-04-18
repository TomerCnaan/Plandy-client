import React from "react";

// services
import columnService from "../../services/columnService";

// style
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { toast } from "react-toastify";

const AddColumn = (props) => {
	const { column, boardId } = props;

	const handleAddColumn = async () => {
		// TODO: add redux support for adding column
		try {
			throw new Error(); //TODO: remove
			await columnService.createBoardColumn(boardId, column._id);
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
