import React, { useState, useEffect, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/form-elements.css";

const ReuseableDatePicker = ({ dateValue, handlePick }) => {
	const [selectedDate, setSelectedDate] = useState(dateValue);
	const dateRef = useRef(null);

	useEffect(() => {
		handlePick(selectedDate);
	}, [selectedDate]);

	const handleKeyPress = (e) => {
		dateRef.current.blur();
	};

	return (
		<div>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				dateFormat="dd/MM/yyyy"
				minDate={new Date()}
				isClearable={dateValue}
				onKeyDown={handleKeyPress}
				ref={dateRef}
			/>
		</div>
	);
};

export default ReuseableDatePicker;
