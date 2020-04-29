import React from "react";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";
import styled from "styled-components";
import ProfilePic from "../images/profile-pic.svg";

const Top = styled.div`
	width: 100%;
	height: 160px;
	background-color: #f35f0c;
`;

const WrapProfile = styled.div`
	position: absolute;
	vertical-align: middle;
	top: 60px;
	left: 50%;
`;

const ProfilePage = () => {
	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<Top />
				<WrapProfile>
					<img src={ProfilePic} alt="profile picture" />
				</WrapProfile>
			</MainContent>
		</MainWrapper>
	);
};

export default ProfilePage;
