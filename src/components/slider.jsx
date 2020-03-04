import React, { useState } from "react";

// libraries
import { useSpring, animated } from "react-spring";

// components
import BoardNav from "./BoardNav/boardNav";

// style
import Arrow from "../images/slider-arrow.svg";

const Slider = () => {
	const [isHovered, setIsHovered] = useState(false);

	const sliderAnimation = useSpring({
		height: "100%",
		position: "absolute",
		borderRight: "1px solid #e1e1e1",
		zIndex: "10001",
		backgroundColor: "#ffffff",
		transition: " width 200ms ease",
		width: isHovered ? "255px" : "30px"
	});

	const showContent = useSpring({
		height: " 100%",
		overflowX: "hidden",
		transition: "opacity 1000ms ease",
		opacity: isHovered ? 1 : 0
	});

	const sliderOpenArrow = useSpring({
		left: "calc(100% - 12px)",
		border: "1px solid #E1E1E1",
		borderRadius: "20px",
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		padding: "3px 7px",
		paddingRight: "9px",
		position: "absolute",
		top: "18px",
		zIndex: 100,
		display: "flex",
		transform: isHovered ? "rotateY(0)" : "rotateY(-180deg)",
		alignContent: "center"
	});

	const arrow = useSpring({
		transform: isHovered ? "rotate(-180deg)" : "rotate(0deg)"
	});

	return (
		<animated.div
			style={sliderAnimation}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<animated.div style={sliderOpenArrow}>
				<img src={Arrow} alt="arrow" />
			</animated.div>
			<animated.div style={showContent}>
				<BoardNav />
			</animated.div>
		</animated.div>
	);
};

export default Slider;
