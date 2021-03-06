import React, { useState } from "react";

// libraries
import Joi from "joi-browser";

// components
import Input from "./input";
import Select from "./select";

const useForm = (initialState, validationSchema, doSubmit) => {
	const [data, setData] = useState(initialState);
	const [errors, setErrors] = useState({});

	function validate() {
		const options = { abortEarly: false };
		const { error } = Joi.validate(data, validationSchema, options);
		if (!error) return null;

		const _errors = {};
		for (let item of error.details) _errors[item.path[0]] = item.message;
		return _errors;
	}

	function validateProperty({ name, value }) {
		const obj = { [name]: value };
		const schema = { [name]: validationSchema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		let _errors = validate();
		setErrors({ errors: _errors || {} });
		if (_errors) return;

		_errors = await doSubmit(data, errors);
		if (_errors) {
			setErrors({ ..._errors });
		}
	}

	function handleChange({ currentTarget: input }) {
		const { name, value } = input;
		const errorMessage = validateProperty(input);
		if (errorMessage) setErrors({ ...errors, [name]: errorMessage });
		else setErrors({ ...errors, [name]: "" });

		setData({
			...data,
			[name]: value,
		});
	}

	function renderButton(label, style) {
		return (
			<button className={style} disabled={validate()}>
				{label}
			</button>
		);
	}

	function renderInput(
		name,
		label,
		placeholder,
		type = "text",
		style = "input-area"
	) {
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				placeholder={placeholder}
				onChange={handleChange}
				error={errors[name]}
				style={style}
			/>
		);
	}

	function renderSelect(name, label, placeholder, options) {
		return (
			<Select
				name={name}
				value={data[name]}
				label={label}
				placeholder={placeholder}
				options={options}
				onChange={handleChange}
				error={errors[name]}
			/>
		);
	}

	return {
		handleSubmit,
		renderInput,
		renderButton,
		renderSelect,
	};
};

export default useForm;
