import React, { useState, useEffect } from "react";

// services
import cellService from "../../services/cellService";

// style
import { Dropdown, Menu, MenuTitle, MenuItem } from "../style/menu-style";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 2px;
	width: calc(90% - 2px);
	height: calc(90% - 2px);
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
	const [open, setOpen] = useState(false);
	const [bgColor, setBgColor] = useState("transparent");

	useEffect(() => {
		if (priorityValue) {
			console.log(options);
			const { color } = options.find((i) => i.value === value);
			setBgColor(color);
		}
	}, []);

	return (
		<Container
			bg={bgColor}
			value={priorityValue}
			onClick={() => setOpen(!open)}
		>
			<span>{priorityValue}</span>
			{open && (
				<Dropdown>
					<Menu>
						<MenuTitle>Options</MenuTitle>
						{options.map((option, index) => (
							<MenuItem key={index}> {option.value} </MenuItem>
						))}
					</Menu>
				</Dropdown>
			)}
		</Container>
	);
};

export default PriorityCell;
