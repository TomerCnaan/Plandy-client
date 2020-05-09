import React, { useState, useEffect } from "react";

// services
import companyService from "../services/companyService";
import userService from "../services/userService";

import Joi from "joi-browser";

// nav
import { NavLink } from "react-router-dom";

// components
import Slider from "./slider";
import useForm from "./common/useForm";

// style
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { MainWrapper, MainContent } from "./style/main-app";
import styled from "styled-components";
import { toast } from "react-toastify";
import nameLabel from "../images/name-label.svg";
import { ReactComponent as Illustration } from "../images/profile-ill.svg";

const PageName = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 30px;
	padding-left: 30px;
	padding-right: 30px;
	font-weight: bold;
	font-size: 22px;
	color: #3e3e3e;
	padding-bottom: 10px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 30px 200px;
`;

const AvatarWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;

const Head = styled.div`
	display: flex;
	flex-direction: column;
	/* align-self: flex-start; */
	padding-left: 20px;
`;

const Username = styled.div`
	font-weight: bolder;
	font-size: 40px;
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 50px;
`;

const Link = styled.span`
	color: #f35f0c;
	transition: background-color 500ms ease-in-out;
	border: 0.5px solid #f35f0c;
	:hover {
		background-color: #f35f0c;
		color: white;
	}
`;

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		backgroundColor: "#FF5722",
		fontSize: "40px",
	},
}));

// ---------------------------------------------

const INTITIAL_STATE = {
	name: "",
};

// ---------------------------------------------

const ProfilePage = ({ user }) => {
	const classes = useStyles();
	const [companyName, setCompanyName] = useState(null);
	const [newName, setNewName] = useState("");

	useEffect(() => {
		fetchCompany();
	}, [user]);

	const fetchCompany = async () => {
		try {
			const { data } = await companyService.getCompanyName(user.company);
			setCompanyName(data.companyName);
			setNewName(user.name);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	const schema = {
		name: Joi.string().required().label("Name"),
	};

	const doSubmit = async (data, errors) => {
		try {
			console.log(data);
			const { data: jwt } = await userService.updateUsername(
				data.name,
				user._id
			);
			localStorage.setItem("token", jwt);
			setNewName(data.name);
			toast.success("Your name has been updated successfully!");
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				errors.name = ex.response.data;
				return { ...errors };
			}
		}
	};

	const { handleSubmit, renderInput, renderButton } = useForm(
		INTITIAL_STATE,
		schema,
		doSubmit
	);

	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<PageName>
					<span>Profile page</span>
					<Link>
						<NavLink
							to="/logout"
							style={{
								fontWeight: "lighter",
								padding: "2px 5px",
								fontSize: "22px",
							}}
						>
							{`Logout`}
						</NavLink>
					</Link>
				</PageName>
				{user && (
					<Container>
						<AvatarWrapper>
							<Avatar className={classes.avatar}>{user.name[0]}</Avatar>
							<Head>
								<Username>
									<span>{newName}</span>
								</Username>
								<span>Email: {user.email}</span>
								<span> Role: {user.role} </span>
							</Head>
						</AvatarWrapper>
						<div style={{ display: "flex" }}>
							<Body>
								<span
									style={{
										fontSize: "20px",
										fontWeight: "normal",
										paddingBottom: "20px",
									}}
								>
									Company:{" "}
									<NavLink
										to="/company"
										style={{
											fontWeight: "lighter",
											color: "#f35f0c",
											padding: "0px 5px",
										}}
									>
										{companyName}
									</NavLink>
								</span>
								<form
									onSubmit={handleSubmit}
									noValidate
									className={classes.form}
								>
									{renderInput(
										"name",
										nameLabel,
										"Update name",
										"text",
										"input-area-profile"
									)}
									{renderButton("Update", "submit-update")}
								</form>
							</Body>

							<Illustration height="400" />
						</div>
					</Container>
				)}
			</MainContent>
		</MainWrapper>
	);
};

export default ProfilePage;
