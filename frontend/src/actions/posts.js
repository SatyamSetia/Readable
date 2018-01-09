import { fetchPosts } from "../utils";

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function receivePosts(posts) {
	return {
		type: RECEIVE_POSTS,
		payload: posts
	};
}

export function getPosts() {
	return function(dispatch) {
		return fetchPosts().then(posts =>
			dispatch(receivePosts(posts))
		);
	};
}
