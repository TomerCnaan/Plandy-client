import styled from "styled-components";

export const MainWrapper = styled.main`
	position: absolute;
	background-color: #ffffff;
	z-index: 1000;
	top: 0;
	right: 0;
	bottom: 0;
	left: 66px;
	height: 100%;
	display: flex;
	overflow: hidden;
	border-radius: 12px 0px 0px 0px;
	transition: left 100ms ease;
`;

export const MainContent = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	flex-grow: 1;
	min-width: 0;
	width: 100%;
	margin-left: 50px;
	margin-top: 20px;
	transition: margin-left 200ms ease, visibility 200ms ease, opacity 200ms ease;
`;

export default MainWrapper;
