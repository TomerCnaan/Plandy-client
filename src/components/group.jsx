import React from "react";

// style
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-self: flex-start;
	min-height: 50px;
	width: 800px;
	margin: 8px;
	border: 1px solid lightgray;
	border-radius: 5px;
`;

const Title = styled.h3`
	padding: 8px;
`;

const Group = ({ group }) => {
	console.log(group);
	const { tasks } = group;
	console.log(tasks);
	return (
		<Container>
			<Title>{group.title}</Title>
		</Container>
	);
};

export default Group;
