import React from "react";

// libraries
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { deleteBoard } from "../../actions/boardActions";

// services
import boardService from "../../services/boardService";

// style
import { Item, Name } from "./board-nav-style";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";

const Board = (props) => {
	const { name, id, description, user } = props;
	const dispatch = useDispatch();
	const boardsList = useSelector((state) => state.boards.boardsList);

	const handleDeleteBoard = async () => {
		const result = window.confirm(
			"Are you sure that you want to delete this board?"
		);
		if (result) {
			const originalBoardsList = _.cloneDeep(boardsList);
			const originalBoard = _.find(boardsList, { _id: id });
			const originalIndex = _.findIndex(boardsList, { _id: id });
			const newBoardsList = _.cloneDeep(boardsList);
			newBoardsList.splice(originalIndex, 1);
			dispatch(deleteBoard(id, newBoardsList, originalBoard));

			try {
				await boardService.deleteBoard(id);
				toast.success("The board has been deleted 🗑️");
				window.location = "/home-page";
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}
				dispatch(deleteBoard(id, originalBoardsList, originalBoard));
			}
		}
	};

	return (
		<Item>
			<Link to={`/board/${id}`} title={description}>
				<Name>{name}</Name>
			</Link>
			<IconButton
				aria-label="delete"
				onClick={() => handleDeleteBoard()}
				disabled={user.role === "member"}
			>
				<DeleteIcon fontSize="small" />
			</IconButton>
		</Item>
	);
};

export default Board;
