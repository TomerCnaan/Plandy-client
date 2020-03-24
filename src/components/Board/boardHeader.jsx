import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	margin-bottom: 30px;
`;

const Title = styled.h2`
	font-size: 34px;
	font-weight: medium;
	text-transform: capitalize;
	color: #2d2d2d;
`;

const Description = styled.h3`
	width: 50%;
	font-weight: lighter;
	font-size: 14px;
	text-transform: capitalize;
	color: #b5b5b5;
	:hover {
		border: 0.5px dashed lightgrey;
	}
`;

const BoardHeader = ({ data }) => {
	const { name, description } = data;

	return (
		<Container>
			<Title>{name}</Title>
			<Description contentEditable="true">{description}</Description>
		</Container>
	);
};

export default BoardHeader;
