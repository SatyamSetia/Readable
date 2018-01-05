import { GET_CATEGORIES } from '../actions/index';

export function fetchAllCategories(state=[], action) {
	switch(action.type) {
		case GET_CATEGORIES: return [action.payload];
		default: return state;
	}
}