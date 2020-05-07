import React, { useState, useEffect } from "react";

// components
import DropdownMenu from "../common/dropdownMenu";

// services
import cellService from "../../services/cellService";

// style
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(98% - 2px);
	height: calc(98% - 2px);
`;

const Btn = styled.button`
	width: 100%;
	height: 100%;
	border: 0;
	font-family: "Montserrat", sans-serif;
	font-size: 15px;
	color: white;
	background-color: ${(props) => (props.value ? props.bg : "transparent")};
	border-radius: 2px;
	:focus {
		outline: none;
	}
	:hover {
		border-top-right-radius: 10px;
		border-bottom-left-radius: 10px;
		cursor: pointer;
	}
`;

const PriorityCell = ({
	boardId,
	taskId,
	boardColumnId,
	options,
	value,
	permitted,
}) => {
	const [priorityValue, setPriorityValue] = useState(value ? value : null);
	const [anchor, setAnchor] = useState(null);
	const [bgColor, setBgColor] = useState("transparent");

	useEffect(() => {
		if (priorityValue) {
			const { color } = options.find((i) => i.value === value);
			setBgColor(color);
		}
	}, []);

	const handleUpdateCell = async (option) => {
		setAnchor(null);
		const originalValue = priorityValue;
		const originalColor = bgColor;
		setPriorityValue(option.value);
		setBgColor(option.color);

		try {
			await cellService.setPriorityCell(
				boardId,
				taskId,
				option.value,
				boardColumnId
			);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
			setPriorityValue(originalValue);
			setBgColor(originalColor);
		}
	};

	const handleCloseMenu = () => {
		setAnchor(null);
	};

	const handleAddOption = () => {
		setAnchor(null);
		// TODO: add option
	};

	return (
		<Container>
			<Btn
				type="button"
				bg={bgColor}
				value={priorityValue}
				onClick={(e) => setAnchor(e.currentTarget)}
				title="Click to change the priority"
				disabled={!permitted}
			>
				<span>{priorityValue}</span>
			</Btn>
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
