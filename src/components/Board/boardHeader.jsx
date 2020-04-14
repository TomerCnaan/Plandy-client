import React, { useState } from "react";

// services
import boardService from "../../services/boardService";

// libraries
import { useSelector, useDispatch } from "react-redux";

// actions
import { updateDescription } from "../../actions/boardActions";

// components
import Settings from "./settings";
import AddGroup from "./addGroup";

// style
import styled from "styled-components";
import { TextArea } from "../style/main-app";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	border-bottom: 1px solid #e1e1e1;
	padding-left: 40px;
	padding-top: 35px;
	overflow-y: hidden;
	flex-shrink: 0;
`;

const Head = styled.div`
	display: flex;
	flex-grow: 1;
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
`;

const Actions = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding-right: 50px;
	align-items: center;
`;

const Util = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding-right: 50px;
	padding-top: 20px;
	padding-bottom: 15px;
`;

const BoardHeader = ({ data }) => {
	const { name, description, _id } = data;
	const boardsList = useSelector((state) => state.boards.boardsList);

	const dispatch = useDispatch();
	const [descriptionValue, setDescriptionValue] = useState(description);

	const handleChange = (e) => {
		console.log(e.target);
		setDescriptionValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		const originalDescr = description;
		dispatch(updateDescription(_id, descriptionValue));

		try {
			await boardService.changeDescription(_id, descriptionValue);
		} catch (ex) {
			if (ex.error && ex.error.status < 500) {
				toast.error("Falied to update board description");
			}
			setDescriptionValue(originalDescr);
			dispatch(updateDescription(_id, originalDescr));
		}
	};

	return (
		<Container>
			<Head>
				<Text>
					<Title>{name}</Title>
					<Description>
						<TextArea
							value={descriptionValue}
							onChange={handleChange}
							onKeyDown={handleKeyPress}
							onBlur={handleSubmit}
							rows="1"
							wrap="off"
						>
							{descriptionValue}
						</TextArea>
					</Description>
				</Text>
				<Actions>
					<Settings boardId={_id} boardsList={boardsList} />
				</Actions>
			</Head>
			<Util>
				<AddGroup boardId={_id} />
			</Util>
		</Container>
	);
};

export default BoardHeader;
