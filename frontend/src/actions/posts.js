import { fetchAllPosts, fetchCategoryPosts } from "../utils";

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS";

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
