import styled from "styled-components";

export const FormWrapper = styled.div`
	position: absolute;
	display: flex;
	width: 75%;
	height: 90%;
	left: 50%;
	transform: translate(-50%, 0);
	align-self: center;
	background-color: white;
	border-radius: 24px 24px 24px 24px;
	box-shadow: 9px 9px 8px rgba(23, 23, 27, 0.36),
		15px 15px 10px rgba(0, 0, 0, 0.17);
`;

export const LeftBanner = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	width: 41%;
	top: 0;
	left: 0;

	border-radius: 24px 0px 0px 24px;
`;

export const RightContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;

	height: 100%;
	width: 59%;
	top: 0;
	right: 0;
`;

export const H1 = styled.h1`
	color: #f35f0c;
	font-size: 48px;
	text-align: center;
	font-weight: 600;
`;
