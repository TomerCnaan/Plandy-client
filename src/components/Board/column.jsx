import React, { useState } from "react";

// libraries
import { Draggable } from "react-beautiful-dnd";

// style
import styled from "styled-components";
import DragGrip from "../../images/column-grip.svg";

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 140px;
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
`;

const Name = styled.h4`
	font-weight: 300;
	/* padding: 8px; */
	font-size: 16px;
	color: #171717;
`;

const Grip = styled.div`
	opacity: ${(props) => (props.isHovered ? "100" : "0")};
	padding-right: ${(props) => (props.isHovered ? "10px" : "0px")};
	transition: 300ms ease;
`;

const Img = styled.img`
	vertical-align: middle;
`;

const Column = ({ column, index, groupName }) => {
	const [isHovered, setIsHovered] = useState(false);

	const { name } = column;

	return (
		<Draggable draggableId={`${groupName}-${name}`} index={index}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Grip {...provided.dragHandleProps} isHovered={isHovered}>
						<Img src={DragGrip} alt="grip" />
					</Grip>
					<Name>{name}</Name>
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
