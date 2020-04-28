const boardOwnerInfo = `
    You are the board Owner!
    You are permitted to do all the board actions, 
       all the actions will be applied to the other 
       board users.
`;

const boardPermittedInfo = `
    You are in an Editor role.
    You can modify tasks and columns.
    You can change the order of the items but it won't be saved for the other users.
`;

const boardReadOnlyInfo = `
    Your role is Viewer. You can change the order of the items and the naming but it
    won't be saved for the other users.
`;

function getInfo(owner, isPermitted) {
	if (owner) {
		return boardOwnerInfo;
	} else if (isPermitted) {
		return boardPermittedInfo;
	} else {
		return boardReadOnlyInfo;
	}
}

export default {
	getInfo,
};
