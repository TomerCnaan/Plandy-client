import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* ------------------------- */
/*       Initialization      */
/* ------------------------- */
html * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Montserrat', sans-serif;
	font-weight: 300;
	line-height: 1.5;
	width: 100%;
	height: 100%;
	background-color: #fff;
	margin: 0px;
	padding: 0px;
	overflow: hidden;
}

/* ------------------------- */
/*    Elements base style    */
/* ------------------------- */

div {
	vertical-align: baseline;
}

a {
	text-decoration: none !important;
	color: inherit;
}

button {
	font-family: 'Montserrat', sans-serif;
	background: transparent;
}
`;

export default GlobalStyle;
