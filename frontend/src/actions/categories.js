import { fetchCategories } from "../utils";

import { RECEIVE_CATEGORIES } from './types';

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
