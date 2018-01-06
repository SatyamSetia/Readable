import { fetchCategories } from "../utils";

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export function receiveCategories(categories) {
	return {
		type: RECEIVE_CATEGORIES,
		payload: categories
	};
}

export function getCategories() {
	return function(dispatch) {
		return fetchCategories().then(categories =>
			dispatch(receiveCategories(categories))
		);
	};
}
