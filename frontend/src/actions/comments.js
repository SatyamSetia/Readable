import { fetchAllComments } from '../utils/index';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';

export function receiveAllComments(comments) {
	return {
		type: RECEIVE_ALL_COMMENTS,
		payload: comments
	}
}

export function getAllComments(postId) {
	return function(dispatch) {
		return fetchAllComments(postId).then(comments =>
			dispatch(receiveAllComments(comments))
		);
	}
}