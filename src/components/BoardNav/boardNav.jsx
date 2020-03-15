import React, { useEffect, useState } from "react";

// libraries
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardNames } from "./../../actions/boardActions";
import { Link } from "react-router-dom";

// components
import AddBoardModal from "../addBoardModal";
import Boards from "./boards";
import Spinner from "../common/spinner";
import SearchBox from "../common/searchBox";

// style
import {
	SliderContent,
	Header,
	Title,
	Search,
	Seperator
} from "./board-nav-style";
import SearchIcon from "@material-ui/icons/Search";

const BoardNav = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const user = useSelector(state => state.users.user);
	const loading = useSelector(state => state.boards.isLoading);
	const boards = useSelector(state => state.boards.boardsList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBoardNames());
	}, []);

	const handleSearch = query => {
		setSearchQuery(query);
	};

	let role = "member";
	if (user) role = user.role;

	return (
		<SliderContent>
			<Header>
				<Title>Boards</Title>
				{role !== "member" && <AddBoardModal />}
			</Header>
			<Search>
				<SearchBox value={searchQuery} onChange={handleSearch} />
			</Search>
			<Seperator />
			{loading ? <Spinner /> : boards && <Boards query={searchQuery} />}
		</SliderContent>
	);
};

export default BoardNav;
