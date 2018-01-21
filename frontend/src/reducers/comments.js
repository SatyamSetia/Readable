import { RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT } from '../actions/comments';

export function fetchAllComments(state=[], action){
	switch(action.type){
		case RECEIVE_ALL_COMMENTS: return action.payload;
		default: return state;
	}
}

export function fetchComment(state={}, action){
	switch(action.type){
		case RECEIVE_COMMENT: return action.payload;
		default: return state;
	}
}