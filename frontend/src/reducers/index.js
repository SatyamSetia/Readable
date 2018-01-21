import { combineReducers } from 'redux';
import { fetchAllCategories } from './categories';
import { fetchPosts, fetchPost } from './posts';
import { fetchAllComments, fetchComment } from './comments';

export default combineReducers({
	fetchAllCategories,
	fetchPosts,
	fetchPost,
	fetchAllComments,
	fetchComment
})