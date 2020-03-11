import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	alert: {
		display: "inline-flex",
		minWidth: "58.5%",
		marginTop: "0px",
		backgroundColor: "rgb(239, 174, 168)"
	},
	label: {
		verticalAlign: "middle"
	}
}));

const Select = ({ name, label, placeholder, options, error, ...rest }) => {
	const classes = useStyles();
	return (
		<div>
			<label
				htmlFor={name}
				className={classes.label}
				style={{ fontWeight: "bold", fontSize: "14px" }}
			>
				{label}
			</label>
			<select name={name} id={name} {...rest} className="input-area">
				<option value=""></option>
				{options.map(option => (
					<option key={option._id} value={option.name}>
						{option.name}
					</option>
				))}
			</select>
			{error && (
				<div>
					<Alert severity="error" className={classes.alert}>
						{" "}
						{error}{" "}
					</Alert>
				</div>
			)}
		</div>
	);
};

export default Select;
