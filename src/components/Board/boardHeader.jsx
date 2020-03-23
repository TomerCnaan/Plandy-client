import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	margin-bottom: 30px;
`;

const Title = styled.h2`
	font-size: 38px;
	font-weight: medium;
	text-transform: capitalize;
`;

const Description = styled.h3`
	font-weight: lighter;
	font-size: 20px;
	text-transform: capitalize;
`;

const BoardHeader = ({ data }) => {
	const { name, description } = data;

	return (
		<Container>
			<Title>{name}</Title>
			<Description>{description}</Description>
		</Container>
	);
};

export default BoardHeader;
