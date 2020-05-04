import React, { useState } from "react";
import Joi from "joi-browser";

// services
import cellService from "../../services/cellService";

// style
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	align-self: center;
	justify-self: center;
	align-items: center;
	justify-content: center;
	height: 80%;
	width: 96%;
	padding-left: 3px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const LinkWrap = styled.div`
	display: ${(props) => (props.focused ? "none" : "flex")};
	justify-content: center;
	align-items: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 95%;
	height: 75%;
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
	border: 1px solid transparent;
	padding: 0 2px;
	transition: 300ms ease;
	/* :hover {
		border: 1px dashed gray;
	} */
`;
const Link = styled.a`
	display: flex;
	justify-self: flex-start;
	max-width: 80%;
	text-decoration: underline;
	color: blue;
	overflow: hidden;
`;

const EditLink = styled.textarea`
	display: ${(props) => (props.focused ? "flex" : "none")};
	border: 1px dashed transparent;
	white-space: nowrap;
	font-family: "Montserrat", sans-serif;
	font-weight: lighter;
	font-size: 14px;
	color: #5a5a5a;
	background-color: #f5f5f5;
	resize: none;
	outline: none;
	padding: 2px 0px;
	overflow: hidden;
	transition: 300ms ease;
	width: 95%;
	height: 75%;
	:hover,
	:focus {
		border: 1px dashed gray;
	}
`;

const LinkCell = ({ boardId, groupId, taskId, boardColumnId, value }) => {
	const [linkValue, setLinkValue] = useState(value);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);

	const schema = {
		link: Joi.string().uri().required(),
	};

	const handleChange = (e) => {
		setLinkValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		setFocused(false);
		const { error } = Joi.validate({ link: linkValue }, schema);
		if (error) {
			toast.error(error.details[0].message);
			setLinkValue("");
			return;
		}

		const originalText = value;

		try {
			await cellService.setLinkCell(boardId, taskId, linkValue, boardColumnId);
		} catch (ex) {
			if (ex.response && ex.response.status < 500) {
				toast.error(ex.response.data);
			}

			setLinkValue(originalText);
		}
	};

	return (
		<Container>
			<LinkWrap
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				hovered={hovered}
				focused={focused}
				// onClick={() => setFocused(true)}
			>
				<Link
					href={linkValue}
					target="_blank"
					rel="noopener noreferrer"
					title={linkValue}
				>
					{linkValue}
				</Link>
				<IconButton
					size="small"
					onClick={() => setFocused(true)}
					style={{
						display: hovered ? "flex" : "none",
						justifySelf: "flexEnd",
					}}
				>
					<EditIcon fontSize="small" />
				</IconButton>
			</LinkWrap>
			<EditLink
				row="1"
				spellCheck="false"
				wrap="off"
				onClick={() => setFocused(true)}
				hovered={hovered}
				focused={focused}
				value={linkValue ? linkValue : ""}
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				onBlur={handleSubmit}
			>
				{linkValue}
			</EditLink>
		</Container>
	);
};

export default LinkCell;
