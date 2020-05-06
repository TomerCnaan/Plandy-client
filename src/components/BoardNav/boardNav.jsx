import React, { useEffect, useState } from "react";

// libraries
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardNames } from "./../../actions/boardActions";

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
	Seperator,
} from "./board-nav-style";
import "../style/form-elements.css";

const BoardNav = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const user = useSelector((state) => state.users.user);
	const loading = useSelector((state) => state.boards.isLoading);
	const boards = useSelector((state) => state.boards.boardsList);
	const dispatch = useDispatch();

	const [_boards, set_boards] = useState(boards);
	useEffect(() => {
		set_boards(boards);
	}, [boards]);

	useEffect(() => {
		dispatch(fetchBoardNames());
	}, []);

	const handleSearch = (query) => {
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
				<SearchBox
					value={searchQuery}
					onChange={handleSearch}
					className="search-input-area"
				/>
			</Search>
			<Seperator />
			{loading ? (
				<Spinner />
			) : (
				_boards && <Boards query={searchQuery} user={user} />
			)}
		</SliderContent>
	);
};

export default BoardNav;
