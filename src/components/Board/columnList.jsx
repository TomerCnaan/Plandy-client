import React, { useEffect, useState } from "react";

// components
import Column from "./column";
import ColumnMenu from "./columnMenu";

// services
import columnService from "../../services/columnService";

// libraries
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

// style
import styled from "styled-components";

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

	const [columnTypes, setColumnTypes] = useState(null);
	useEffect(() => {
		fetchTypes();
	}, []);

	const fetchTypes = async () => {
		const { data } = await columnService.getColumnTypes();
		setColumnTypes(data);
	};

	return (
		<Container>
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
