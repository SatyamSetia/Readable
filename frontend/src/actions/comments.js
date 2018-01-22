import { fetchAllComments, voteCommentRequest, addCommentRequest } from '../utils/index';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

export function receiveAllComments(comments) {
	return {
		type: RECEIVE_ALL_COMMENTS,
		payload: comments
	}
}

export function recieveComment(comment) {
	return {
		type: RECEIVE_COMMENT,
		payload: comment
	}
}

export function getAllComments(postId) {
	return function(dispatch) {
		return fetchAllComments(postId).then(comments =>
			dispatch(receiveAllComments(comments))
		);
	}
}

export function voteComment(commentId, vote) {
	return function(dispatch) {
		return voteCommentRequest(commentId, vote).then(comment =>
			dispatch(recieveComment(comment))
		);
	}
}

export function addComment(comment) {
	return function(dispatch) {
		return addCommentRequest(comment).then(comment =>
			dispatch(recieveComment(comment))
		);
	}
}