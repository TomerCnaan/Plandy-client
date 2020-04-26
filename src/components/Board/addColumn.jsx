import React from "react";

// libraries
import { useDispatch, useSelector } from "react-redux";

// actions
import { addColumn } from "../../actions/boardActions";

// services
import columnService from "../../services/columnService";
import authService from "../../services/authService";

// style
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { toast } from "react-toastify";

const AddColumn = (props) => {
	const { column, boardId, colAmount } = props;

	const dispatch = useDispatch();
	const maxColumnsAmount = useSelector(
		(state) => state.visibility.maxAmountColumns
	);

	const handleAddColumn = async () => {
		if (colAmount < maxColumnsAmount) {
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
		} else {
			toast.info("reached max amount of columns");
		}
	};

	return (
		<MenuItem onClick={handleAddColumn}>
			<ListItemText primary={column.type} />
		</MenuItem>
	);
};

export default AddColumn;
