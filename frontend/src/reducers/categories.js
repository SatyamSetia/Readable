import { RECEIVE_CATEGORIES } from '../actions/categories';

export function fetchAllCategories(state={}, action) {
	switch(action.type) {
		case RECEIVE_CATEGORIES: return action.payload;
		default: return state;
	}
}