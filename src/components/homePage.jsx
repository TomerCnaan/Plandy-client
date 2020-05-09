import React, { useState, useEffect } from "react";

// services
import companyService from "../services/companyService";

// nav
import { NavLink } from "react-router-dom";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";
import styled from "styled-components";
import { ReactComponent as Illustration } from "../images/home-page-ill.svg";
import { toast } from "react-toastify";

const PageName = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 30px;
	padding-left: 30px;
	padding-right: 30px;
	font-weight: bold;
	font-size: 22px;
	color: #3e3e3e;
	padding-bottom: 70px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const Name = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	font-weight: bolder;
	font-size: 48px;
	color: #f35f0c;
	padding-bottom: 10px;
`;

const Img = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Advice = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-bottom: 50px;
`;

const Link = styled.span`
	color: #f35f0c;
	transition: background-color 500ms ease-in-out;
	border: 0.5px solid #f35f0c;
	:hover {
		background-color: #f35f0c;
		color: white;
	}
`;

const HomePage = ({ user }) => {
	const [randomAdvice, setRandomAdvice] = useState("");
	const [companyName, setCompanyName] = useState(null);

	useEffect(() => {
		fetchAdvice();
	}, []);

	const fetchAdvice = () => {
		fetch("https://api.adviceslip.com/advice")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const { advice } = data.slip;
				setRandomAdvice(advice);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCompany();
	}, [user]);

	const fetchCompany = async () => {
		try {
			const { data } = await companyService.getCompanyName(user.company);
			setCompanyName(data.companyName);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<PageName>
					<span>Home Page</span>
					<Link>
						<NavLink
							to="/logout"
							style={{
								fontWeight: "lighter",
								padding: "2px 5px",
							}}
						>
							{`Logout`}
						</NavLink>
					</Link>
				</PageName>

				{user && (
					<Container>
						<Name>Hello {user.name}!</Name>
						<Advice>Random Advice: {randomAdvice}</Advice>
						<Img>
							<Illustration />
						</Img>
					</Container>
				)}
			</MainContent>
		</MainWrapper>
	);
};

export default HomePage;
