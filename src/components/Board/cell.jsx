import React from "react";

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

const Cell = ({ data }) => {
	const value = data ? data.value : null;
	const type = data ? data.columnType : null;

	const cellWidth = useSelector((state) => state.visibility.columnWidth);

	return (
		<Container width={cellWidth}>
			<Text>{value}</Text>
		</Container>
	);
};

export default Cell;
