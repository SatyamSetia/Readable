const url = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
	'Accept': "application/json",
	'Content-Type': "application/json",
	'Authorization': token
};

export const fetchCategories = () =>
	fetch(`${url}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories);