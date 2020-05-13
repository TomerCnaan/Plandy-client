import React from "react";

import randomColor from "../../util/randomColor";

import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		fontSize: 12,
	},
}));

const AssignCell = () => {
	const classes = useStyles();
	const names = ["T", "O", "Y", "A"];
	return <div>Avatar</div>;
};

export default AssignCell;
