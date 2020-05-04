import React, { useState, useEffect } from "react";

// libraries
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

// services
import boardService from "../../services/boardService";

// style
import IconButton from "@material-ui/core/IconButton";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Dropdown, Menu, MenuItem, MenuTitle } from "../style/menu-style";

const AddUsers = ({ boardId, owner, type }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [newUsers, setNewUsers] = useState([]);
	const [toAddString, setToAddString] = useState("");
	const [selectedRole, setSelectedRole] = useState("read only");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const { data } = await boardService.getUsersNotInBoard(boardId);
			setUsers(data);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	const handleClick = (user) => {
		console.log(user);
		setNewUsers([...newUsers, user._id]);
		setUsers(_.without(users, user));
		setToAddString(`${toAddString}${user.name}, `);
	};

	const handleRoleChange = (e) => {
		setSelectedRole(e.target.value);
	};

	const handleAddUsers = async () => {
		setOpen(false);
		const permitted = selectedRole === "permitted" ? true : false;

		// TODO: add redux support
		try {
			// throw new Error();
			await boardService.addUsersToBoard(boardId, newUsers, permitted);
			toast.success("Users were added successfully 💯");
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}
		}
	};

	return (
		<div>
			<IconButton
				onClick={() => setOpen(!open)}
				title="add users"
				disabled={type === "public" ? true : !owner}
			>
				<GroupAddIcon />
			</IconButton>
			{open && (
				<Dropdown>
					<Menu>
						<IconButton
							onClick={() => setOpen(false)}
							style={{ float: "right", paddingTop: "0px", color: "#bb7d0a" }}
						>
							<CloseIcon />
						</IconButton>
						<FormControl component="fieldset" style={{ color: "#a7a7a7" }}>
							<FormLabel component="legend" style={{ color: "#a7a7a7" }}>
								Role
							</FormLabel>
							<RadioGroup
								aria-label="roles"
								name="roles"
								value={selectedRole}
								onChange={handleRoleChange}
							>
								<FormControlLabel
									value="read only"
									control={<Radio style={{ color: "#fda80d" }} />}
									label="Viewer"
								/>
								<FormControlLabel
									value="permitted"
									control={<Radio style={{ color: "#fda80d" }} />}
									label="Editor"
								/>
							</RadioGroup>
						</FormControl>
						<MenuTitle
							style={{
								height: "auto",
								fontSize: "16px",
								borderColor: "#fda80d",
								margin: "10px 0px",
							}}
						>
							Users To Add: {toAddString}
						</MenuTitle>
						{users.length !== 0 ? (
							users.map((user) => (
								<MenuItem
									hoverable={true}
									key={user._id}
									onClick={() => handleClick(user)}
								>
									{user.name}
								</MenuItem>
							))
						) : (
							<MenuItem>No other users to add</MenuItem>
						)}
						<Button
							style={{
								display: "flex",
								marginLeft: "auto",
								marginTop: "10px",
								color: "white",
								backgroundColor: "#bb7d0a",
							}}
							variant="contained"
							size="small"
							startIcon={<AddIcon />}
							onClick={handleAddUsers}
							disabled={newUsers.length === 0}
						>
							Add Users
						</Button>
					</Menu>
				</Dropdown>
			)}
		</div>
	);
};

export default AddUsers;
