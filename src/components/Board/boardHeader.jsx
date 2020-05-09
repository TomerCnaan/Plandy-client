import React, { useState, useEffect, useRef } from "react";

// services
import boardService from "../../services/boardService";
import boardInfo from "../../text/boardInfo";

// libraries
import { useSelector, useDispatch } from "react-redux";

// actions
import { updateDescription } from "../../actions/boardActions";
import { setSearchQuery } from "../../actions/searchActions";

// components
import Settings from "./settings";
import AddGroup from "./addGroup";
import UsersList from "./usersList";
import AddUsers from "./addUsers";
import SearchBox from "../common/searchBox";

// style
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	border-bottom: 1px solid #e1e1e1;
	padding-left: 40px;
	padding-top: 35px;
	overflow-y: hidden;
	flex-shrink: 0;
`;

const Head = styled.div`
	display: flex;
	flex-grow: 1;
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
`;

const Title = styled.h2`
	font-size: 34px;
	font-weight: medium;
	text-transform: capitalize;
	color: #2d2d2d;
`;

const Type = styled.div`
	font-weight: lighter;
	color: #ff6f6f;
	align-self: center;
	padding-left: 25px;
	transition: color 300ms ease;
	:hover {
		color: red;
	}
`;

const Description = styled.h3`
	display: flex;
	flex-basis: 50%;
	width: 50%;
	font-weight: lighter;
	font-size: 14px;
	text-transform: capitalize;
	color: #b5b5b5;
`;

const Actions = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding-right: 50px;
	align-items: center;
`;

const Util = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding-right: 50px;
	padding-top: 20px;
	padding-bottom: 15px;
`;

const TextArea = styled.textarea`
	font-family: "Montserrat", sans-serif;
	white-space: nowrap;
	border: 0.5px dashed transparent;
	padding: 0px 5px;
	border-radius: 0;
	height: 100%;
	width: 100%;
	outline: 0;
	overflow: hidden;
	font-size: 15px;
	line-height: 20px;
	:hover,
	:focus {
		border: 0.5px dashed lightgrey;
	}
	:disabled {
		background-color: white;
	}
	resize: none;
`;

const InfoToolTip = withStyles((theme) => ({
	tooltip: {
		boxShadow: theme.shadows[1],
		fontSize: 14,
		maxWidth: 300,
		backgroundColor: theme.palette.info.main,
		wordSpacing: 1.5,
		padding: 5,
	},
}))(Tooltip);

const BoardHeader = ({ data, owner, permitted }) => {
	const { name, description, _id, type } = data;
	const boardsList = useSelector((state) => state.boards.boardsList);

	const dispatch = useDispatch();
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [infoValue, setInfoValue] = useState("");
	const searchQuery = useSelector((state) => state.search.searchQuery);

	useEffect(() => {
		setInfoValue(boardInfo.getInfo(owner, permitted));
	}, []);

	const handleChange = (e) => {
		console.log(e.target);
		setDescriptionValue(e.target.value);
	};

	const textAreaRef = useRef(null);
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			textAreaRef.current.blur();
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		const originalDescr = description;
		dispatch(updateDescription(_id, descriptionValue));

		try {
			await boardService.changeDescription(_id, descriptionValue);
		} catch (ex) {
			if (ex.error && ex.error.status < 500) {
				toast.error("Falied to update board description");
			}
			setDescriptionValue(originalDescr);
			dispatch(updateDescription(_id, originalDescr));
		}
	};

	const handleSearch = (query) => {
		dispatch(setSearchQuery(query));
	};

	return (
		<Container>
			<Head>
				<Text>
					<div style={{ display: "flex" }}>
						<Title>{name}</Title>
						<div style={{ alignSelf: "center", paddingLeft: "10px" }}>
							<InfoToolTip
								title={infoValue ? infoValue : ""}
								arrow
								placement="right-start"
								interactive
							>
								<IconButton size="small">
									<InfoIcon />
								</IconButton>
							</InfoToolTip>
						</div>
						<Type>{type} board</Type>
					</div>
					<Description>
						<TextArea
							value={descriptionValue}
							onChange={handleChange}
							onKeyDown={handleKeyPress}
							onBlur={handleSubmit}
							rows="1"
							wrap="off"
							spellCheck="false"
							ref={textAreaRef}
							disabled={!owner}
						>
							{descriptionValue}
						</TextArea>
					</Description>
				</Text>
				<Actions>
					{owner && <AddUsers boardId={_id} owner={owner} type={type} />}
					<UsersList boardId={_id} />
					<Settings boardId={_id} boardsList={boardsList} owner={owner} />
				</Actions>
			</Head>
			<Util>
				<SearchBox
					value={searchQuery}
					onChange={handleSearch}
					className="in-board-search"
				/>
				<AddGroup boardId={_id} owner={owner} />
			</Util>
		</Container>
	);
};

export default BoardHeader;
