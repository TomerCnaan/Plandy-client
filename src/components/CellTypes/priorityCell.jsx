import React, { useState, useEffect } from "react";

// components
import DropdownMenu from "../common/dropdownMenu";

// services
import cellService from "../../services/cellService";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 2px;
	width: calc(98% - 2px);
	height: calc(98% - 2px);
	background-color: ${(props) => (props.value ? props.bg : "transparent")};
	color: white;
	:hover {
		border-top-right-radius: 10px;
		border-bottom-left-radius: 10px;
		cursor: pointer;
	}
`;

const PriorityCell = ({ boardId, taskId, boardColumnId, options, value }) => {
	const [priorityValue, setPriorityValue] = useState(value ? value : null);
	const [anchor, setAnchor] = useState(null);
	const [bgColor, setBgColor] = useState("transparent");

	useEffect(() => {
		if (priorityValue) {
			const { color } = options.find((i) => i.value === value);
			setBgColor(color);
		}
	}, []);

	const handleUpdateCell = () => {
		console.log("updating cell.");
	};

	const handleCloseMenu = () => {
		console.log("In handle close menu");
		setAnchor(null);
		console.log(anchor);
	};

	return (
		<Container
			bg={bgColor}
			value={priorityValue}
			onClick={(e) => {
				setAnchor(e.currentTarget);
				console.log("clicking");
			}}
		>
			<span>{priorityValue}</span>
			<DropdownMenu
				anchor={anchor}
				options={options}
				handleUpdateCell={handleUpdateCell}
				handleCloseMenu={handleCloseMenu}
			/>
		</Container>
	);
};

export default PriorityCell;
