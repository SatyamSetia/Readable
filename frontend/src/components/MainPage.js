import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
import { getPosts } from "../actions/posts";
import PostList from './PostList';
import AppBar from "material-ui/AppBar";
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

class MainPage extends Component {

	//const {categories} = this.props;

	renderCategories(){
		return this.props.categories.map(category => {
			return (<li key={category.name} style={{float: 'left', listStyleType: 'none'}}>
					<FlatButton label={category.name}/>
				</li>)
		})
	}

	render() {
		console.log("props", this.props);
		return (
			<div>
				<AppBar
					title="Readable"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<Subheader>Categories</Subheader>
				<ul>{this.renderCategories()}</ul>
				<br/>
				<br/>
				<Subheader>Posts</Subheader>
				<PostList/>
			</div>
		);
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
