import React, { useState, useEffect } from "react";

// components
import Slider from "./slider";

// services
import companyService from "../services/companyService";
import userService from "../services/userService";

// style
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { MainWrapper, MainContent } from "./style/main-app";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const PageName = styled.div`
	padding-top: 30px;
	padding-left: 30px;
	font-weight: bold;
	font-size: 22px;
	color: #3e3e3e;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const Title = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding-top: 30px;
	font-weight: bolder;
	font-size: 48px;
`;

const Details = styled.div`
	display: flex;
	padding: 5px 50px;
	padding-top: 50px;
	justify-content: space-between;
	font-weight: 500;
	width: 100%;
	font-size: 16px;
`;

const Detail = styled.span`
	padding: 0px 60px;
`;

const Users = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 20px 40px;
	width: 100%;
`;

const useStyles = makeStyles((theme) => ({
	root: {
		width: 255,
		maxWidth: 255,
		margin: theme.spacing(1),
	},
	formControl: {
		minWidth: 200,
		justifyContent: "center",
	},
}));

const TeamPage = ({ user }) => {
	const classes = useStyles();
	const [companyData, setCompanyData] = useState(null);

	useEffect(() => {
		fetchInfo();
	}, [user]);

	const fetchInfo = async () => {
		try {
			if (user) {
				const { data } = await companyService.getCompanyInfo(user.company);
				console.log(data);
				setCompanyData(data);
			}
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

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

	const handleRoleChange = async (e, compUser) => {
		const confirmed = window.confirm(
			"Are you sure that you want to change this user's role?"
		);

		if (confirmed) {
			// TODO: change role in server
			const index = companyData.companyUsers.indexOf(compUser);
			const original = companyData.companyUsers;
			const newUsers = companyData.companyUsers;
			newUsers[index].role = e.target.value;
			const updated = {
				...companyData,
				companyUsers: newUsers,
			};
			setCompanyData(updated);

			try {
				await userService.changeRole(compUser._id, e.target.value);
			} catch (ex) {
				if (ex.response && ex.response.status < 500) {
					toast.error(ex.response.data);
				}
				setCompanyData(original);
			}
		}
	};

	return (
		<MainWrapper>
			<Slider />
			<MainContent>
				<PageName>Company Page</PageName>
				{companyData && (
					<Container>
						<Title>{companyData.companyName}</Title>
						<Details>
							<Detail>created at: {companyData.createdDate}</Detail>
							<Detail>
								company owner: {companyData.companyOwner[0].name}{" "}
							</Detail>
							<Detail>
								company members: {`${companyData.companyUsers.length} members`}
							</Detail>
						</Details>
						<Divider variant="middle" />
						<Users>
							{companyData.companyUsers.map((compUser) => (
								<Card key={compUser._id} className={classes.root}>
									<CardHeader
										avatar={
											<Avatar
												aria-label="profile"
												style={{ backgroundColor: `${randomColor()}` }}
											>
												{compUser.name[0]}
											</Avatar>
										}
										title={compUser.name}
										subheader={compUser.email}
									/>
									<CardContent>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											Role: {compUser.role}
										</Typography>
									</CardContent>
									<CardActions>
										{user.role !== "member" &&
										compUser.role !== "supervisor" ? (
											<FormControl component="fieldset">
												<FormLabel component="legend">Role</FormLabel>
												<RadioGroup
													aria-label="roles"
													name="roles"
													value={compUser.role}
													onChange={(e) => handleRoleChange(e, compUser)}
												>
													<FormControlLabel
														value="member"
														control={<Radio />}
														label="Member"
														disabled={user.role === "admin"}
													/>
													<FormControlLabel
														value="admin"
														control={<Radio />}
														label="Admin"
													/>
												</RadioGroup>
											</FormControl>
										) : null}
									</CardActions>
								</Card>
							))}
						</Users>
					</Container>
				)}
			</MainContent>
		</MainWrapper>
	);
};

export default TeamPage;
