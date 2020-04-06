import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140px;
	height: 40px;
`;

const Text = styled.div`
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
`;

const Cell = ({ data }) => {
	const { value, columnType } = data;
	return (
		<Container>
			<Text>{value}</Text>
		</Container>
	);
};

export default Cell;
