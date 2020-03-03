import React from "react";

// components
import AddUserModal from "../addUserModal";

// libraries
import { Link } from "react-router-dom";

// style
import { SideNav, NavItems, Logo, Company, Account, Add } from "./nav-style";
import navLogo from "../../images/nav-logo.svg";
import navNotif from "../../images/nav-notif.svg";
import navTeam from "../../images/nav-company.svg";
import navProfile from "../../images/nav-profile.svg";

const NavBar = userObj => {
	const { user } = userObj;
	return (
		<div>
			{user && (
				<SideNav>
					<NavItems>
						<Logo>
							<Link to="/">
								<img src={navLogo} alt="logo" width="35" height="45" />
							</Link>
						</Logo>
						<div>
							<img
								src={navNotif}
								alt="notifications"
								width="40px"
								height="40px"
							/>
						</div>
						<Company>
							<Link to="/company" title="company">
								<img src={navTeam} alt="team" width="40px" height="40px" />
							</Link>
						</Company>
						<Add>
							<AddUserModal />
						</Add>
						<Account>
							<Link to="/profile" title="profile">
								<img
									src={navProfile}
									alt="profile"
									width="40px"
									height="40px"
								/>
							</Link>
						</Account>
					</NavItems>
				</SideNav>
			)}
		</div>
	);
};

export default NavBar;
