import { RECEIVE_ALL_COMMENTS } from '../actions/comments';

export function fetchAllComments(state=[], action){
	switch(action.type){
		case RECEIVE_ALL_COMMENTS: return action.payload;
		default: return state;
	}
}