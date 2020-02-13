import styled from "styled-components";

const MainWrapper = styled.main`
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

export default MainWrapper;
