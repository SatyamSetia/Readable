import { RECEIVE_POSTS } from '../actions/posts';

export function fetchAllPosts(state={}, action) {
	switch(action.type) {
		case RECEIVE_POSTS: return action.payload;
		default: return state;
	}
}