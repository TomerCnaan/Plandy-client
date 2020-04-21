import React, { useState } from "react";

// services
import columnService from "../../services/columnService";

// libraries
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

// actions
import { deleteColumn } from "../../actions/boardActions";

// style
import styled from "styled-components";
import DragGrip from "../../images/column-grip.svg";
import DeleteColumn from "../../images/column-delete.svg";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	min-width: 120px;
	max-width: 180px;
	width: ${(props) => props.width};
	height: 40px;
	background-color: ${(props) => (props.isDragging ? "#f5f5f5" : "none")};
	border: ${(props) =>
		props.isDragging ? "border: 0.5px solid #dad3d3" : "none"};
	border-bottom: 0;
	border-radius: 10px 10px 0px 0px;
	flex-shrink: 0;
	:hover {
		background-color: #f5f5f5;
		border: 0.5px solid #dad3d3;
		border-bottom: 0;
		border-radius: 10px 10px 0px 0px;
	}
	${(props) =>
		props.isFocused &&
		`background-color: #f5f5f5;
		border: 0.5px solid #dad3d3;
		border-bottom: 0;
		border-radius: 10px 10px 0px 0px;`};
`;

const Name = styled.div`
	position: ${(props) => (props.isHovered ? "inline" : "absolute")};
	display: ${(props) =>
		props.isHovered ? "none" : props.isFocused ? "none" : "flex"};
	justify-self: center;
	font-weight: 300;
	/* padding-right: ${(props) => (props.isHovered ? "0" : "20px")}; */
	font-size: 16px;
	color: #171717;
	white-space: nowrap;
`;

const EditableName = styled.textarea`
	display: ${(props) =>
		props.isHovered ? "flex" : props.isFocused ? "flex" : "none"};
	text-align: justify;
	justify-self: ${(props) => (props.isHovered ? "center" : "auto")};
	border: 0.5px dashed transparent;
	/* width: ${(props) => props.width}; */
	white-space: nowrap;
	font-family: "Montserrat", sans-serif;
	font-weight: 300;
	font-size: 16px;
	color: #171717;
	height: 22px;
	background-color: ${(props) => (props.isHovered ? "#f5f5f5" : "none")};
	resize: none;
	text-align-last: center;
	outline: none;
	padding: 1px 0px;
	overflow: hidden;
	transition: 300ms ease;
	:hover, :focus {
		border: 0.5px dashed lightgray;
		margin-right: 4px;
	}
`;

const Grip = styled.div`
	/* display: ${(props) => (props.isHovered ? "inline" : "none")}; */
	opacity: ${(props) => (props.isHovered ? "100" : "0")};
	padding-right: ${(props) => (props.isHovered ? "5px" : "0px")};
	transition: 300ms ease;
	display: flex;
`;

const Img = styled.img`
	vertical-align: middle;
`;

const DelBtn = styled.button`
	border: none;
	:hover {
		cursor: pointer;
	}
`;

const Column = ({ column, index, groupName, boardId }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const dispatch = useDispatch();

	const { _id, name } = column;
	const [nameValue, setNameValue] = useState(name);

	const colWidth = useSelector((state) => state.visibility.columnWidth);

	const handleDeleteColumn = async () => {
		const result = window.confirm(
			"Are you sure that you want to delete this column? this action will affect the entire board."
		);

		if (result) {
			const originalColumn = column;
			dispatch(deleteColumn(boardId, index, null));
			try {
				await columnService.deleteBoardColumn(boardId, _id);
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}
				dispatch(deleteColumn(boardId, index, originalColumn));
			}
		}
	};

	const handleChange = (e) => {
		setNameValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		setIsFocused(false);
		const originalName = name;
		try {
			await columnService.updateColumnName(boardId, _id, nameValue);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
			setNameValue(originalName);
		}
	};

	return (
		<Draggable draggableId={`${groupName}-${name}`} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					width={colWidth}
					isFocused={isFocused}
				>
					<Grip {...provided.dragHandleProps} isHovered={isHovered}>
						<Img src={DragGrip} alt="grip" />
					</Grip>
					<Grip isHovered={isHovered}>
						<DelBtn onClick={handleDeleteColumn}>
							<Img src={DeleteColumn} alt="delete" />
						</DelBtn>
					</Grip>
					<Name isHovered={isHovered} isFocused={isFocused}>
						{nameValue}
					</Name>
					<EditableName
						onClick={() => setIsFocused(true)}
						spellCheck="false"
						isHovered={isHovered}
						isFocused={isFocused}
						rows="1"
						wrap="off"
						value={nameValue}
						onChange={handleChange}
						onKeyDown={handleKeyPress}
						onBlur={handleSubmit}
					>
						{name}
					</EditableName>
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
