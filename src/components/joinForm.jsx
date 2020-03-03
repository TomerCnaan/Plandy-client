import React from "react";

// libraried
import { NavLink, Redirect } from "react-router-dom";
import Joi from "joi-browser";

// components
import useForm from "./common/useForm";
import userService from "../services/userService";
import auth from "../services/authService";

// style
import Grid from "@material-ui/core/Grid";
import "./style/form-elements.css";
import { useStyles, H1 } from "./style/form-style";
import Sign from "../images/sign.svg";
import nameLabel from "../images/name-label.svg";
import emailLabel from "../images/email-label.svg";
import passwordLabel from "../images/password-label.svg";

// ---------------------------------------------

const INTITIAL_STATE = {
	name: "",
	email: "",
	password: ""
};

// ---------------------------------------------

const JoinForm = ({ match }) => {
	const schema = {
		name: Joi.string()
			.required()
			.label("Name"),
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
			const response = await userService.addUser(data, match.params.token);
			auth.loginWithJwt(response.headers["x-auth-token"]);
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
				<Grid item sm={false} md={3} lg={4} className={classes.image}>
					<img src={`${Sign}`} className={classes.formLogo} alt="logo" />
				</Grid>
				<Grid item sm={9} md={9} lg={8}>
					<H1>Create User</H1>
					<form onSubmit={handleSubmit} noValidate className={classes.form}>
						{renderInput("name", nameLabel, "Name")}
						{renderInput("email", emailLabel, "Email")}
						{renderInput("password", passwordLabel, "Password", "password")}
						{renderButton("Sign Up", "submit-btn")}
					</form>
					<Grid item align="center" className={classes.link}>
						<span>
							{`Already have an account?`}
							<NavLink to="/login" style={{ color: "#f35f0c" }}>
								{` Sign In`}
							</NavLink>
						</span>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default JoinForm;
