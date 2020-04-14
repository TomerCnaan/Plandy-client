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
	width: 100%;
	/* margin-left: 70px; */
	margin-left: 30px;
	/* margin-top: 20px; */
	transition: margin-left 200ms ease, visibility 200ms ease, opacity 200ms ease;
	overflow: auto;
`;

export const TextArea = styled.textarea`
	font-family: "Montserrat", sans-serif;
	white-space: nowrap;
	border: none;
	padding: 0px 5px;
	border-radius: 0;
	height: 100%;
	width: 100%;
	outline: 0;
	overflow: hidden;
	font-size: 13px;
	line-height: 20px;
	:hover,
	:focus {
		border: 0.5px dashed lightgrey;
	}
	resize: none;
`;

export default MainWrapper;
