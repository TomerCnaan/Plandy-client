import React from "react";

// libraries
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const SideNav = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100%;
	width: 66px;
	top: 0;
	left: 0;
	flex-shrink: 0;
	color: #ffffff;
	background-color: #1e3d6b;
`;

const NavBar = () => {
	return (
		<SideNav>
			<Link className="" to="/">
				P
			</Link>
		</SideNav>
	);
};

export default NavBar;
