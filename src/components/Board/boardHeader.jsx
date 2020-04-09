import React from "react";

// libraries
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { deleteBoard } from "../../actions/boardActions";

// services
import boardService from "../../services/boardService";

// style
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	margin-bottom: 30px;
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
`;

const Title = styled.h2`
	font-size: 34px;
	font-weight: medium;
	text-transform: capitalize;
	color: #2d2d2d;
`;

const Description = styled.h3`
	display: flex;
	flex-basis: 50%;
	width: 50%;
	font-weight: lighter;
	font-size: 14px;
	text-transform: capitalize;
	color: #b5b5b5;
	:hover {
		border: 0.5px dashed lightgrey;
	}
`;

const Actions = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding-right: 50px;
	align-items: center;
`;

const BoardHeader = ({ data }) => {
	const { name, description, _id } = data;

	const dispatch = useDispatch();
	const boardsList = useSelector((state) => state.boards.boardsList);

	const handleDeleteBoard = async () => {
		const result = window.confirm(
			"Are you sure that you want to delete this board?"
		);
		if (result) {
			const originalBoardsList = _.cloneDeep(boardsList);
			const originalBoard = _.find(boardsList, { _id: _id });
			const originalIndex = _.findIndex(boardsList, { _id: _id });
			const newBoardsList = _.cloneDeep(boardsList);
			newBoardsList.splice(originalIndex, 1);
			dispatch(deleteBoard(_id, newBoardsList, originalBoard));

			try {
				await boardService.deleteBoard(_id);
				toast.success("The board has been deleted 🗑️");
				window.location = "/home-page";
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}
				dispatch(deleteBoard(_id, originalBoardsList, originalBoard));
			}
		}
	};

	return (
		<Container>
			<Text>
				<Title>{name}</Title>
				<Description>{description}</Description>
			</Text>
			<Actions>
				<Button
					style={{ height: "35px" }}
					variant="contained"
					color="secondary"
					startIcon={<DeleteIcon />}
					onClick={() => handleDeleteBoard()}
				>
					Delete
				</Button>
			</Actions>
		</Container>
	);
};

export default BoardHeader;
