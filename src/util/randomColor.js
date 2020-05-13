const randomColor = () => {
	const colors = [
		"#E94B56",
		"#EAA89C",
		"#1976D2",
		"#30AA8D",
		"#2D59A2",
		"#C83772",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

export default randomColor;
