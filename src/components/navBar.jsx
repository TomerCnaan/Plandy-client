import React from "react";

// libraries
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

// style
import navLogo from "../images/nav-logo.svg";
import navNotif from "../images/nav-notif.svg";

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
	background-color: #353761;
`;

const NavItems = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
`;

const Logo = styled.div`
	margin: 22px 28px 41px 28px;
`;

const NavBar = userObj => {
	const { user } = userObj;
	return (
		<div>
			{user && (
				<SideNav>
					<NavItems>
						<Logo>
							<Link className="" to="/">
								<img src={navLogo} alt="logo" width="41px" height="51.42px" />
							</Link>
						</Logo>
						<img
							src={navNotif}
							alt="notifications"
							width="40px"
							height="40px"
						/>
					</NavItems>
				</SideNav>
			)}
		</div>
	);
};

export default NavBar;
