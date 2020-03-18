import React from "react";

// libraries
import { NavLink, Redirect } from "react-router-dom";
import Joi from "joi-browser";

// components
import useForm from "./common/useForm";
import auth from "../services/authService";

// style
import Grid from "@material-ui/core/Grid";
import "./style/form-elements.css";
import { useStyles, H1 } from "./style/form-style";
import Sign from "../images/sign.svg";
import emailLabel from "../images/email-label.svg";
import passwordLabel from "../images/password-label.svg";

// ---------------------------------------------

const INTITIAL_STATE = {
	email: "",
	password: ""
};

// ---------------------------------------------

const LoginForm = props => {
	const schema = {
		email: Joi.string()
			.required()
			.email()
			.label("Email"),
		password: Joi.string()
			.required()
			.label("Password")
	};

	const doSubmit = async (data, errors) => {
		try {
			await auth.login(data.email, data.password);
			// const { state } = props.location;
			// window.location = state ? state.from.pathname : "/";
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				errors.email = ex.response.data;
				return { ...errors };
			}
		}
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
			<Grid container direction="row" className={classes.wrapper}>
				<Grid item xs={12} sm={12} md={4} lg={4} className={classes.image}>
					<img src={`${Sign}`} className={classes.formLogo} alt="logo" />
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={8}>
					<H1>Log In</H1>
					<form onSubmit={handleSubmit} noValidate className={classes.form}>
						{renderInput("email", emailLabel, "Email")}
						{renderInput("password", passwordLabel, "Password", "password")}
						{renderButton("Sign In", "submit-btn")}
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
