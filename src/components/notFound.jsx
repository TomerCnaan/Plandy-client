import React from "react";

// libraries
import styled from "styled-components";

//style
import Illustration from "../images/not-found.svg";

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-content: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: white;
	/* width: 1500px;
	height: 802px; */
	width: 70%;
	height: 80%;
	box-shadow: 8px 8px 8px rgba(16, 16, 19, 0.54);
	border-radius: 29px;
	font-family: "Just Another Hand";
`;

const H1 = styled.h1`
	font-size: 96px;
	line-height: 96px;
	text-align: center;
	margin: 45px 0px;
	text-transform: uppercase;
	/* background: -webkit-linear-gradient(right, #ff9d00, #211d65);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent; */
	color: #ff9d00;
`;

const Img = styled.img`
	max-width: 100%;
	max-height: 100%;
	height: 90%;
	width: 90%;
`;

const NotFound = () => {
	return (
		<Container>
			<H1>page not found</H1>
			<div style={{ position: "realtive", flexGrow: "1", textAlign: "center" }}>
				<Img src={Illustration} alt="illustration" />
			</div>
		</Container>
	);
};

export default NotFound;
