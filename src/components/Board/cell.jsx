import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140px;
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

	return (
		<Container>
			<Text>{value}</Text>
		</Container>
	);
};

export default Cell;
