const createSimpleAction = actionType => payload => ({
	type: actionType,
	payload
});

export default createSimpleAction;
