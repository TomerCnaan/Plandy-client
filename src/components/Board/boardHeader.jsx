import React from "react";

// libraries
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// components
import Settings from "./settings";

// style
import styled from "styled-components";

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
	const boardsList = useSelector((state) => state.boards.boardsList);

	return (
		<Container>
			<Text>
				<Title>{name}</Title>
				<Description>{description}</Description>
			</Text>
			<Actions>
				<Settings boardId={_id} boardsList={boardsList} />
			</Actions>
		</Container>
	);
};

export default BoardHeader;
