import React from "react";

// libraried
import { NavLink } from "react-router-dom";
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
import companyLabel from "../images/company-label.svg";

// ---------------------------------------------

const INTITIAL_STATE = {
	name: "",
	email: "",
	password: "",
	companyName: ""
};

// ---------------------------------------------

const RegiterForm = props => {
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
			.label("Password"),
		companyName: Joi.string()
			.required()
			.label("Company Name")
	};

	const doSubmit = (data, errors) => {
		try {
			const response = userService.register(data);

			console.log(response.headers["x-auth-token"]); //TODO: fix the function. fails on auth.loginWithJwt
			auth.loginWithJwt(response.headers["x-auth-token"]);
			console.log("logging in with jwt");
			window.location = "/";
		} catch (ex) {
			console.log("exception occured");
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

	return (
		<div className={classes.root}>
			<Grid
				container
				direction="row"
				sm={false}
				lg={10}
				className={classes.wrapper}
			>
				<Grid item sm={false} md={3} lg={4} className={classes.image}>
					<img src={`${Sign}`} className={classes.formLogo} alt="logo" />
				</Grid>
				<Grid item sm={12} md={9} lg={8} alignContent="center">
					<H1>Create Account</H1>
					<form onSubmit={handleSubmit} noValidate className={classes.form}>
						{renderInput("name", nameLabel, "Name")}
						{renderInput("email", emailLabel, "Email")}
						{renderInput("password", passwordLabel, "Password", "password")}
						{renderInput("companyName", companyLabel, "Company Name")}
						{renderButton("Sign Up")}
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

export default RegiterForm;
