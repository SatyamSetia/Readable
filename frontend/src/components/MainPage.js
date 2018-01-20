import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostListItem from "./PostListItem";

import { getCategories } from "../actions/categories";
import { getPosts } from "../actions/posts";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import Subheader from "material-ui/Subheader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

class MainPage extends Component {
	renderCategories() {
		return this.props.categories.map(category => {
			return (
				<li
					key={category.name}
					style={{ float: "left", listStyleType: "none" }}
				>
					<FlatButton
						label={category.name}
						primary={true}
						onClick={() => this.handleCategoryClick(category)}
					/>
				</li>
			);
		});
	}

	handleCategoryClick(category) {
		this.props.history.push(category.path);
		this.props.getPosts(category.path);
	}

	componentDidMount() {
		this.props.getPosts(this.props.match.url.substr(1));
	}

	renderPostList() {
		return this.props.posts.map(post => (
			<li key={post.id} className="post-list">
				<PostListItem
					post={post}
				/>
			</li>
		));
	}

	render() {
		return (
			<div>
				<div>
					<AppBar title="Readable" />
					<Subheader>Categories</Subheader>
					<ul>{this.renderCategories()}</ul>
					<br />
					<br />
				</div>
				<div>
					<Subheader>Posts</Subheader>
					<ul>{this.renderPostList()}</ul>
					<Link to="/create">
						<FloatingActionButton className="open">
							<ContentAdd />
						</FloatingActionButton>
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ fetchAllCategories, fetchPosts }) {
	return {
		categories: fetchAllCategories,
		posts: fetchPosts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories()),
		getPosts: category => dispatch(getPosts(category))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
