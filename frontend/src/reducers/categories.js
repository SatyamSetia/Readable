import { RECEIVE_CATEGORIES } from '../actions/types';

export function fetchAllCategories(state=[], action) {
	switch(action.type) {
		case RECEIVE_CATEGORIES: return action.payload;
		default: return state;
	}
}