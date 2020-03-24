import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 140px;
	height: 40px;
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
