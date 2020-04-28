import styled from "styled-components";

export const Dropdown = styled.div`
	position: absolute;
	top: 90px;
	width: 250px;
	transform: translateX(-75%);
	background-color: #242526;
	border: 1px solid #474a4d;
	border-radius: 8px;
	padding: 1rem;
	overflow: hidden;
	transition: height 500ms ease;
	z-index: 10;
`;

export const Menu = styled.div`
	width: 100%;
`;

export const MenuTitle = styled.span`
	color: #a7a7a7;
	font-size: 12px;
	height: 25px;
	display: flex;
	align-items: center;
	transition: background 500ms;
	padding: 0.5rem;
	padding-bottom: 4px;
	border-bottom: 1px solid #474a4d;
`;

export const MenuItem = styled.span`
	color: #dadce1;
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 8px;
	transition: background 500ms;
	padding: 0.5rem;
	cursor: ${(props) => (props.hoverable ? "pointer" : "default")};
	:hover {
		background-color: #525357;
	}
`;
