import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/form-elements.css";

const ReuseableDatePicker = ({ dateValue, handlePick }) => {
	const [selectedDate, setSelectedDate] = useState(dateValue);

	useEffect(() => {
		handlePick(selectedDate);
	}, [selectedDate]);

	return (
		<div>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				dateFormat="dd/MM/yyyy"
				minDate={new Date()}
				isClearable={dateValue}
			/>
		</div>
	);
};

export default ReuseableDatePicker;
