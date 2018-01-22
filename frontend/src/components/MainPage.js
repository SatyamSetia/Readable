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
import Snackbar from "material-ui/Snackbar";

class MainPage extends Component {
	state = {
		snackbarOpen: false,
		snackbarMessage: ""
	}

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

	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};

	updatePostList(author) {
		this.props.getPosts(this.props.match.url.substr(1)).then(() => this.setState({
			snackbarMessage: `A post by ${author} is deleted`,
			snackbarOpen: true
		}))
	}

	componentDidMount() {
		this.props.getPosts(this.props.match.url.substr(1));
	}

	renderPostList() {
		return this.props.posts.map(post => (
			<li key={post.id} className="post-list">
				<PostListItem
					post={post}
					updatePostList = {(author) => this.updatePostList(author)}
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
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.snackbarMessage}
					autoHideDuration={4000}
					onRequestClose={this.handleSnackbarClose}
				/>
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
