import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
import { getPosts } from "../actions/posts";

class MainPage extends Component {
	render() {
		console.log("props", this.props);
		return <div>MainPage</div>;
	}
}

function mapStateToProps({ fetchAllCategories, fetchAllPosts }) {
	//console.log(categories)
	return {
		categories: fetchAllCategories,
		posts: fetchAllPosts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories()),
		getAllPosts: dispatch(getPosts())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
