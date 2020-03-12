import { useEffect } from "react";
import auth from "../services/authService";
import { useDispatch } from "react-redux";
import { removeUser } from "../actions/userActions";

const Logout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		auth.logout();
		dispatch(removeUser());
		window.location = "/";
	});
	return null;
};

export default Logout;
