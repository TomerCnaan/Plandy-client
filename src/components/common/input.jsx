import React from "react";
import { Alert } from "@material-ui/lab";

const Input = ({ name, label, error, style, ...rest }) => {
	return (
		<div>
			<label htmlFor="name">{name}</label>
			<input {...rest} name={name} id={name} />
			{error && <Alert severity="error"> {error} </Alert>}
		</div>
	);
};

export default Input;
