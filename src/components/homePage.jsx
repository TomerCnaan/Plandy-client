import React from "react";

// components
import Slider from "./slider";

// style
import { MainWrapper, MainContent } from "./style/main-app";

const HomePage = () => {
	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<h1>Home Page</h1>
			</MainContent>
		</MainWrapper>
	);
};

export default HomePage;
