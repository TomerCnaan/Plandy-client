import React from "react";

const SearchBox = ({ value, onChange, className }) => {
	return (
		<input
			type="text"
			name="query"
			className={className}
			placeholder="Search..."
			value={value}
			onChange={(e) => onChange(e.currentTarget.value)}
		/>
	);
};

export default SearchBox;
