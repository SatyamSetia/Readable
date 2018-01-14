import { fetchAllPosts, fetchCategoryPosts, fetchPost } from "../utils";

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

export function receiveAllPosts(posts) {
	return {
		type: RECEIVE_ALL_POSTS,
		payload: posts
	};
}

export function getAllPosts() {
	return function(dispatch) {
		return fetchAllPosts().then(posts =>
			dispatch(receiveAllPosts(posts))
		);
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
		return fetchCategoryPosts(category).then(posts =>
			{console.log('action',posts)
			dispatch(receiveCategoryPosts(posts))})
	};
}

export function getPosts(category) {
	return category?getCategoryPosts(category):getAllPosts();
}

export function recievePost(post) {
	return {
		type: RECEIVE_POST,
		payload: post
	}
}

export function getPost(postId) {
	return function(dispatch) {
		return fetchPost(postId).then(post =>
			dispatch(recievePost(post)))
	};
}