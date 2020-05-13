import React, { useState, useRef } from "react";

import moment from "moment";

// services
import cellService from "../../services/cellService";

// components
import ReuseableDatePicker from "../common/datePicker";

// style
import styled from "styled-components";
import { toast } from "react-toastify";

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
	color: lightcoral;
	border: 1px solid transparent;
	padding: 0 2px;
`;

const DateCell = ({ boardId, groupId, taskId, boardColumnId, value }) => {
	const [dateValue, setDateValue] = useState(value ? new Date(value) : "");
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const dateRef = useRef(null);

	const handlePick = async (date) => {
		dateRef.current.blur();
		if (date === dateValue) return;
		setDateValue(date);
		const originalDate = value;

		try {
			await cellService.setDateCell(
				boardId,
				taskId,
				date ? date : "",
				boardColumnId
			);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}

			setDateValue(originalDate);
		}
	};

	return (
		<Container
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			ref={dateRef}
		>
			<Text hovered={hovered} focused={focused}>
				<span style={{ whiteSpace: "nowrap" }}>
					{moment(dateValue).calendar()}
				</span>
			</Text>
			{hovered || focused ? (
				<ReuseableDatePicker dateValue={dateValue} handlePick={handlePick} />
			) : null}
		</Container>
	);
};

export default DateCell;
