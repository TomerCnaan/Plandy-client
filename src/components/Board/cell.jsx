import React from "react";

// components
import TextCell from "../CellTypes/textCell";
import LinkCell from "../CellTypes/linkCell";
import PriorityCell from "../CellTypes/priorityCell";
import NumberCell from "../CellTypes/numberCell";
import DateCell from "../CellTypes/dateCell";
import AssignCell from "../CellTypes/assignCell";

// libraries
import { useSelector } from "react-redux";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	min-width: 120px;
	max-width: 180px;
	width: ${(props) => props.width};
	height: 40px;
	border-right: 0.5px solid #dad3d3;
	border-left: 0.5px solid #dad3d3;
`;

const Text = styled.div`
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
`;

const TEXT_CELL = "text";
const STATUS_CELL = "status";
const PRIORITY_CELL = "priority";
const NUMBER_CELL = "number";
const LINK_CELL = "link";
const DUE_DATE_CELL = "due date";
const ASSIGN_CELL = "assign";

const Cell = ({ data, boardColumn, boardId, groupId, taskId, permitted }) => {
	const value = data ? data.value : null;
	const { options, type } = boardColumn.columnType;
	const { _id: columnId, customOptions } = boardColumn;
	const allOptions = [...options, ...customOptions];

	const cellWidth = useSelector((state) => state.visibility.columnWidth);

	const renderCellByTye = () => {
		switch (type) {
			case TEXT_CELL:
				return (
					<TextCell
						boardId={boardId}
						groupId={groupId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
						permitted={permitted}
					/>
				);
			case LINK_CELL:
				return (
					<LinkCell
						boardId={boardId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
					/>
				);
			case PRIORITY_CELL:
				return (
					<PriorityCell
						boardId={boardId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
						options={allOptions}
						permitted={permitted}
					/>
				);
			case STATUS_CELL:
				return (
					<PriorityCell
						boardId={boardId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
						options={allOptions}
						permitted={permitted}
						status={true}
					/>
				);
			case NUMBER_CELL:
				return (
					<NumberCell
						boardId={boardId}
						groupId={groupId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
						permitted={permitted}
					/>
				);
			case DUE_DATE_CELL:
				return (
					<DateCell
						boardId={boardId}
						groupId={groupId}
						taskId={taskId}
						boardColumnId={columnId}
						value={value}
						permitted={permitted}
					/>
				);
			case ASSIGN_CELL:
				return <AssignCell />;
			default:
				break;
		}
	};

	return <Container width={cellWidth}>{renderCellByTye()}</Container>;
};

export default Cell;
