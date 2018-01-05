const url = "http://localhost:3001";

const headers = {
	Authorization: "random"
};

export const fetchCategories = () => {
	fetch(`${url}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories);
};
