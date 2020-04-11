import React, { useState, useEffect } from "react";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";
import styled from "styled-components";

const Page = styled.div`
	display: flex;
	align-self: center;
	flex-grow: 1;
	text-align: center;
`;

const Advice = styled.h3``;

const HomePage = () => {
	const [randomAdvice, setRandomAdvice] = useState("");

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

	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<h1 style={{ paddingLeft: "40px" }}>Home Page</h1>
				<Page>
					{/* <h2>Hello {propsuser.name}</h2> */}
					<Advice>{randomAdvice}</Advice>
				</Page>
			</MainContent>
		</MainWrapper>
	);
};

export default HomePage;
