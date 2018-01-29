import {
	fetchAllPosts,
	fetchCategoryPosts,
	fetchPost,
	votePostRequest,
	addPostRequest,
	editPostRequest,
	deletePostRequest
} from "../utils";

import {
	RECEIVE_POST,
	RECEIVE_ALL_POSTS,
	RECEIVE_CATEGORY_POSTS
} from "./types";

export function receiveAllPosts(posts) {
	return {
		type: RECEIVE_ALL_POSTS,
		payload: posts
	};
}

export function getAllPosts() {
	return function(dispatch) {
		return fetchAllPosts().then(posts => dispatch(receiveAllPosts(posts)));
	};
}

export function receiveCategoryPosts(posts) {
	return {
		type: RECEIVE_CATEGORY_POSTS,
		payload: posts
	};
}

export function getCategoryPosts(category) {
	return function(dispatch) {
		return fetchCategoryPosts(category).then(posts => {
			dispatch(receiveCategoryPosts(posts));
		});
	};
}

export function getPosts(category) {
	return category ? getCategoryPosts(category) : getAllPosts();
}

export function receivePost(post) {
	return {
		type: RECEIVE_POST,
		payload: post
	};
}

export function getPost(postId) {
	return function(dispatch) {
		return fetchPost(postId).then(post => dispatch(receivePost(post)));
	};
}

export function votePost(postId, vote) {
	return function(dispatch) {
		return votePostRequest(postId, vote).then(post =>
			dispatch(receivePost(post))
		);
	};
}

export function addPost(post) {
	return function(dispatch) {
		return addPostRequest(post).then(post => dispatch(receivePost(post)));
	};
}

export function editPost(postId, title, body) {
	return function(dispatch) {
		return editPostRequest(postId, title, body).then(post =>
			dispatch(receivePost(post))
		);
	};
}

export function deletePost(postId) {
	return function(dispatch) {
		return deletePostRequest(postId);
	};
}
