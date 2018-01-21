const url = "http://localhost:3001";

let token = localStorage.token;
if (!token)
	token = localStorage.token = Math.random()
		.toString(36)
		.substr(-8);

const headers = {
	'Accept': "application/json",
	'Content-Type': "application/json",
	'Authorization': token
};

export const fetchCategories = () =>
	fetch(`${url}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories);

export const fetchAllPosts = () =>
	fetch(`${url}/posts`, { headers })
		.then(res => res.json());

export const fetchCategoryPosts = (category) =>
	fetch(`${url}/${category}/posts`,{ headers })
		.then(res => res.json())

export const fetchPost = (postId) =>
	fetch(`${url}/posts/${postId}`, { headers })
		.then(res => res.json());

export const fetchAllComments = (postId) =>
	fetch(`${url}/posts/${postId}/comments`, { headers })
		.then(res => res.json());

export const votePostRequest = (postId, vote) =>
	fetch(`${url}/posts/${postId}`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			option: vote
		})
	}).then(res => res.json())

export const addPostRequest = (post) =>
	fetch(`${url}/posts`,{
		method: 'POST',
		headers,
		body: JSON.stringify({
			...post,
			timestamp: Date.now()
		})
	}).then(res => res.json())

export const editPostRequest = (postId,title,body) =>
	fetch(`${url}/posts/${postId}`,{
		method:'PUT',
		headers,
		body: JSON.stringify({
			title: title,
			body: body
		})
	}).then(res => res.json())