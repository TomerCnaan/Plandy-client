import React, { useState } from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-self: center;
	justify-self: center;
	align-items: center;
	justify-content: center;
	height: 80%;
	width: 96%;
	padding-left: 3px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const EditText = styled.textarea`
	display: ${(props) =>
		props.hovered ? "flex" : props.focused ? "flex" : "none"};
	border: 1px dashed transparent;
	white-space: nowrap;
	font-family: "Montserrat", sans-serif;
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
	background-color: #f5f5f5;
	resize: none;
	outline: none;
	padding: 2px 0px;
	overflow: hidden;
	transition: 300ms ease;
	width: 95%;
	height: 75%;
	:hover,
	:focus {
		border: 1px dashed gray;
	}
`;

const Text = styled.div`
	display: ${(props) =>
		props.hovered ? "none" : props.focused ? "none" : "flex"};
	justify-content: center;
	align-items: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 95%;
	height: 75%;
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
	border: 1px solid transparent;
	padding: 0 2px;
`;

const TextCell = ({ boardId, groupId, taskId, boardColumnId, value }) => {
	const [textValue, setTextValue] = useState(value);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);

	const handleChange = (e) => {
		setTextValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		setFocused(false);
		console.log("submitting");
		// const originalName = name;
		// try {
		// 	await columnService.updateColumnName(boardId, _id, nameValue);
		// } catch (ex) {
		// 	if (ex.response && ex.response.status < 500) {
		// 		toast.error(ex.response.data);
		// 	}
		// 	setNameValue(originalName);
		// }
	};

	return (
		<Container
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<Text hovered={hovered} focused={focused}>
				<span style={{ whiteSpace: "nowrap" }}>{textValue}</span>
			</Text>
			<EditText
				row="1"
				spellCheck="false"
				wrap="off"
				onClick={() => setFocused(true)}
				hovered={hovered}
				focused={focused}
				value={textValue}
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				onBlur={handleSubmit}
			>
				{textValue}
			</EditText>
		</Container>
	);
};

export default TextCell;
