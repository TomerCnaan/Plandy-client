import styled from "styled-components";

export const SliderWrapper = styled.div`
	height: 100%;
	position: absolute;
	border-right: 1px solid #e1e1e1;
	z-index: 10001;
	background-color: #ffffff;
	width: 30px;
	transition: width 300ms ease;
`;

export const SliderContainer = styled.div`
	height: 100%;
	overflow-x: hidden;
	opacity: 0;
	transition: opacity 300ms ease;
`;

export const SliderContent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 255px;
	overflow-x: hidden;
	color: black;
	align-items: center;
`;
