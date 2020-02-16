import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	alert: {
		width: "570px"
	}
}));

const Input = ({ name, label, error, style, ...rest }) => {
	const classes = useStyles();
	return (
		<div>
			<label htmlFor="name">{label}</label>
			<input className="input-area" {...rest} name={name} id={name} />
			{error && (
				<div style={{ marginLeft: "61px" }}>
					<Alert variant="outlined" severity="error" className={classes.alert}>
						{" "}
						{error}{" "}
					</Alert>
				</div>
			)}
		</div>
	);
};

export default Input;
