import React from "react";

// libraried
import { NavLink, Redirect } from "react-router-dom";
import Joi from "joi-browser";

// components
import useForm from "./common/useForm";
import auth from "../services/authService";

// style
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./style/form-elements.css";
import { H1 } from "./style/form-style";
import Banner from "../images/form-banner.png";

// --------------------

const useStyles = makeStyles(theme => ({
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
	}
}));

const INTITIAL_STATE = {
	email: "",
	password: ""
};

// --------------------

const LoginForm = () => {
	const schema = {
		email: Joi.string()
			.required()
			.email()
			.label("Email"),
		password: Joi.string()
			.required()
			.label("Password")
	};

	const doSubmit = async () => {
		console.log("submitted");
	};

	const { handleSubmit, renderInput, renderButton } = useForm(
		INTITIAL_STATE,
		schema,
		doSubmit
	);

	const classes = useStyles();
	if (auth.getCurrentUser()) return <Redirect to="/" />;
	return (
		<div className={classes.root}>
			<Grid container direction="row" xs={10} className={classes.wrapper}>
				<Grid container direction="column" xs={4}>
					<Grid item xs={12} className={classes.image}></Grid>
				</Grid>
				<Grid container direction="column" xs={8} alignContent="center">
					<H1>Log In</H1>
					<form onSubmit={handleSubmit} noValidate className={classes.form}>
						{renderInput("email", "Email")}
						{renderInput("password", "Password", "password")}
						{renderButton("Sign In")}
					</form>
					<Grid item align="center" className={classes.link}>
						<span>
							{`Don’t have an account?`}
							<NavLink to="/register" style={{ color: "#f35f0c" }}>
								{` Sign Up`}
							</NavLink>
						</span>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginForm;
