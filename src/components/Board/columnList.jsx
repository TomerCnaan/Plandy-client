import React, { useEffect, useState, useRef } from "react";

// components
import Column from "./column";
import ColumnMenu from "./columnMenu";

// services
import columnService from "../../services/columnService";

// libraries
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

// actions
import {
	setColumnContainerWidth,
	setColumnAmount,
	setColumnWidth,
} from "../../actions/visibilityActions";

// style
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
`;

const ColList = styled.div`
	display: flex;
	align-items: flex-end;
	background-color: ${(props) =>
		props.isDraggingOver ? "#ff4f4f17" : "white"};
`;

const ColumnList = ({ boardId, groupIndex, groupName }) => {
	const columnOrder = useSelector(
		(state) => state.boards.boardsData[boardId].column_order
	);

	const dispatch = useDispatch();
	const refWidth = useRef(null);

	useEffect(() => {
		dispatch(setColumnContainerWidth(refWidth.current.offsetWidth));
		dispatch(setColumnAmount(columnOrder.length));
	}, [refWidth.current, columnOrder]);

	const [columnTypes, setColumnTypes] = useState(null);
	useEffect(() => {
		fetchTypes();
	}, []);

	const fetchTypes = async () => {
		try {
			const { data } = await columnService.getColumnTypes();
			setColumnTypes(data);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<Container ref={refWidth}>
			<Droppable
				droppableId={groupName}
				type={`COLUMNS-${groupIndex}`}
				direction="horizontal"
			>
				{(provided, snapshot) => (
					<ColList
						{...provided.droppableProps}
						ref={provided.innerRef}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{columnOrder.map((column, index) => {
							const columnId = column._id;
							return (
								<Column
									key={columnId}
									column={column}
									index={index}
									groupName={groupName}
									boardId={boardId}
								/>
							);
						})}
						{provided.placeholder}
					</ColList>
				)}
			</Droppable>
			{columnTypes && <ColumnMenu columns={columnTypes} boardId={boardId} />}
			<div style={{ width: "3px" }}></div>
		</Container>
	);
};

export default ColumnList;
