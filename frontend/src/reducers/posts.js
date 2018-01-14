import { RECEIVE_ALL_POSTS, RECEIVE_CATEGORY_POSTS, RECEIVE_POST } from "../actions/posts";

export function fetchPosts(state = [], action) {
	let returnValue = [];
	switch (action.type) {
		case RECEIVE_ALL_POSTS:
			returnValue = action.payload;
			break;
		case RECEIVE_CATEGORY_POSTS:
			returnValue = action.payload;
			break;
		default:
			returnValue = state;
	}

	return returnValue;
}

export function fetchPost(state={}, action){
	switch(action.type) {
		case RECEIVE_POST: return action.payload;
		default: return state;
	}
}
