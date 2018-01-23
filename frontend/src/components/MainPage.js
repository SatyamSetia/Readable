import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import PostListItem from "./PostListItem";
import { getCategories } from "../actions/categories";
import { getPosts } from "../actions/posts";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import Subheader from "material-ui/Subheader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from "material-ui/RaisedButton";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";

class MainPage extends Component {
	state = {
		posts: [],
		snackbarOpen: false,
		snackbarMessage: "",
		popoverOpen: false,
		sortBy: "ta"
	};

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

	handlePopoverClick = event => {
		event.preventDefault();

		this.setState({
			popoverOpen: true,
			anchorEl: event.currentTarget
		});
	};

	handlePopoverClose = () => {
		this.setState({
			popoverOpen: false
		});
	};

	updatePostList(author) {
		this.props.getPosts(this.props.match.url.substr(1)).then(() =>
			this.setState({
				snackbarMessage: `A post by ${author} is deleted`,
				snackbarOpen: true
			})
		);
	}

	sortPost(posts) {
		switch (this.state.sortBy) {
			case "ta":
				return _.sortBy(posts, function(post) {
					return post.timestamp;
				});
			case "td":
				return _.sortBy(posts, function(post) {
					return post.timestamp;
				}).reverse();
			case "va":
				return _.sortBy(posts, function(post) {
					return post.voteScore;
				});
			case "vd":
				return _.sortBy(posts, function(post) {
					return post.voteScore;
				}).reverse();
			default:
				return posts;
		}
	}

	componentDidMount() {
		this.props
			.getPosts(this.props.match.url.substr(1))
			.then(posts => this.setState({ posts: this.props.posts }));
	}

	renderPostList() {
		return this.sortPost(this.props.posts).map(post => (
			<li key={post.id} className="post-list">
				<PostListItem
					post={post}
					updatePostList={author => this.updatePostList(author)}
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
					<RaisedButton
						onClick={this.handlePopoverClick}
						label="Sort by"
						className="sort-button"
					/>
					<Popover
						open={this.state.popoverOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{
							horizontal: "left",
							vertical: "bottom"
						}}
						targetOrigin={{ horizontal: "left", vertical: "top" }}
						onRequestClose={this.handlePopoverClose}
					>
						<Menu
							onChange={(event, value) =>
								this.setState({ sortBy: value, popoverOpen: false })}
						>
							<MenuItem
								primaryText="Most Recent first"
								value="td"
							/>
							<MenuItem
								primaryText="Most Recent last"
								value="ta"
							/>
							<MenuItem
								primaryText="Most Popular first"
								value="vd"
							/>
							<MenuItem
								primaryText="Most Popular last"
								value="va"
							/>
						</Menu>
					</Popover>
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
