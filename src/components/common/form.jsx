import React, { useState } from "react";

// libraries
import Joi, { validate } from "joi-browser";

// components
import Input from "./input";
import Select from "./select";

const Form = ({ validationSchema }) => {
	const [data, setData] = useState({});
	const [errors, setErrors] = useState({});

	function validateProperty({ name, value }) {
		const obj = { [name]: value };
		const schema = { [name]: validationSchema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	function handleChange({ currentTarget: input }) {
		const _errors = errors;
		const errorMessage = validateProperty(input);
		if (errorMessage) _errors[input.name] = errorMessage;
		else delete errors[input.name];

		const _data = data;
		data[input.name] = input.value;

		setErrors({ ...errors, _errors });
		setData({ ...data, _data });
	}

	// TODO: finish reusable form component

	return { handleChange, data, errors };
};

export default Form;
