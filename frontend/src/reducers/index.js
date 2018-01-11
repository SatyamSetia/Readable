import { combineReducers } from 'redux';
import { fetchAllCategories } from './categories';
import { fetchPosts } from './posts';

export default combineReducers({
	fetchAllCategories,
	fetchPosts
})