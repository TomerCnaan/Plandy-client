import styled from "styled-components";

export const FormWrapper = styled.div`
	position: absolute;
	display: flex;
	width: 85%;
	height: 85%;
	min-height: 85%;
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
	height: auto;
	width: 41%;
	top: 0;
	left: 0;

	border-radius: 24px 0px 0px 24px;
`;

export const RightContent = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-content: center;
	height: 100%;
	width: 59%;
	top: 0;
	right: 0;
`;

export const H1 = styled.h1`
	display: flex;
	justify-content: center;
	color: #f35f0c;
	font-size: 48px;
	line-height: 59px;
	font-weight: 600;
	margin-top: 81px;
	margin-bottom: 73px;
`;

export const FormContent = styled.div`
	display: flex;
	align-content: center;
	justify-content: center;
`;
