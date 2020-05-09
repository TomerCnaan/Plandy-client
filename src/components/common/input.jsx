import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	alert: {
		display: "inline-flex",
		minWidth: "58.5%",
		marginTop: "0px",
		backgroundColor: "rgb(239, 174, 168)",
	},
	label: {
		verticalAlign: "middle",
	},
}));

const Input = ({ name, label, placeholder, error, style, ...rest }) => {
	const classes = useStyles();
	return (
		<div>
			<label htmlFor="name" className={classes.label}>
				<img src={label} alt="label" />
			</label>
			<input
				className={style ? style : "input-area"}
				{...rest}
				name={name}
				id={name}
				placeholder={placeholder}
			/>
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

export default Input;
