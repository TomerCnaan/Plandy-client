import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "../../images/form-banner.png";

export const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	wrapper: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		height: "85%",
		backgroundColor: "white",
		borderRadius: "24px 24px 24px 24px",
		boxShadow:
			"9px 9px 8px rgba(23, 23, 27, 0.36), 15px 15px 10px rgba(0, 0, 0, 0.17)"
	},
	image: {
		backgroundImage: `url(${Banner})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		borderRadius: "24px 0px 0px 24px"
	},
	form: {
		textAlign: "center"
	},
	link: {
		fontSize: "20px"
	},
	formLogo: {
		marginLeft: "32px",
		marginTop: "32px"
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
