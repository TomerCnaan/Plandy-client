import React from "react";

// style
import "../style/form-elements.css";

const SearchBox = ({ value, onChange }) => {
	return (
		<input
			type="text"
			name="query"
			className="search-input-area"
			placeholder="Search..."
			value={value}
			onChange={e => onChange(e.currentTarget.value)}
		/>
	);
};

export default SearchBox;
