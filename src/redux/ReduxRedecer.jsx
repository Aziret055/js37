const initialState = {
	todo: []
}

export const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return { ...state, todo: action.payload }
		default:
			return state
	}
}
