import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	position: relative;
	width: 140px;
	height: 40px;
	:hover {
		background-color: #f5f5f5;
		border: 0.5px solid #dad3d3;
		border-bottom: 0;
		border-radius: 10px 10px 0px 0px;
	}
`;

const Column = ({ column }) => {
	const { name } = column;

	return (
		<Container>
			{name}
			<span></span>
		</Container>
	);
};

export default Column;
