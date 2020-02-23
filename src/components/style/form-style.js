import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "../../images/form-banner.png";

export const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	wrapper: {
		position: "absolute",
		width: "85%",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		height: "85%",
		maxHeight: "902px",
		minHeight: "590px",
		backgroundColor: "white",
		borderRadius: "24px 24px 24px 24px",
		boxShadow:
			"9px 9px 8px rgba(23, 23, 27, 0.36), 15px 15px 10px rgba(0, 0, 0, 0.17)",
		overflowY: "auto"
	},
	image: {
		backgroundImage: `url(${Banner})`,
		backgroundPosition: "center",
		borderRadius: "24px 0px 0px 24px",
		height: "100%",
		backgroundRepeat: "no-repeat"
	},
	form: {
		textAlign: "center"
		// height: "71.5%"
	},
	formContainer: {},
	link: {
		fontSize: "20px"
	},
	formLogo: {
		marginLeft: "32px",
		marginTop: "32px"
	},
	rightContent: {
		overflowY: "auto"
	}
}));

export const H1 = styled.h1`
	display: flex;
	justify-content: center;
	color: #f35f0c;
	font-size: 48px;
	line-height: 59px;
	font-weight: 600;
	margin-top: 81px;
	margin-bottom: 73px;
`;
