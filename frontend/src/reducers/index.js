import { combineReducers } from 'redux';
import { fetchAllCategories } from './categories';
import { fetchAllPosts } from './posts';

export default combineReducers({
	fetchAllCategories,
	fetchAllPosts
})