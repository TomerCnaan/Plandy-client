import styled from "styled-components";

export const SliderContent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 255px;
	overflow-x: hidden;
	color: black;
`;

export const Header = styled.div`
	width: 100%;
	height: 64px;
	display: flex;
	align-items: center;
	margin-top: 6px;
	padding: 0px 24px;
	padding-top: 8px;
	justify-content: space-between;
`;

export const Title = styled.div`
	font-size: 26px;
	font-weight: 700;
`;

export const Search = styled.div`
	display: flex;
	align-items: center;
`;

export const BtnSearch = styled.button`
	margin-left: 32px;
	padding-top: 7px;
	border: none;
	:enabled {
		cursor: pointer;
	}
	:disabled {
		cursor: default;
	}
`;

export const Seperator = styled.div`
	margin: 20px 0px;
`;

export const Items = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const Name = styled.h1`
	font-weight: normal;
	font-size: 20px;
	line-height: 24px;
	color: #222222;
	padding: 0px 24px;
	:hover {
		color: #f35f0c;
	}
`;

export const Item = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* margin-bottom: 30px; */
	height: 50px;
	:hover {
		background-color: rgba(181, 181, 181, 0.31);
	}
	&:hover ${Name} {
		color: #f35f0c;
	}
`;
