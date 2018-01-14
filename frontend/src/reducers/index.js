import { combineReducers } from 'redux';
import { fetchAllCategories } from './categories';
import { fetchPosts, fetchPost } from './posts';

export default combineReducers({
	fetchAllCategories,
	fetchPosts,
	fetchPost
})