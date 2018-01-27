import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import _ from 'lodash';

import CommentDetail from "./CommentDetail";
import { getPost, votePost, deletePost } from "../actions/posts";
import { getAllComments, addComment } from "../actions/comments";

import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import upvote from "../icons/ic_thumb_up_black_24px.svg";
import upvoteOutline from "../icons/thumb-up-outline.svg";
import downvote from "../icons/ic_thumb_down_black_24px.svg";
import downvoteOutline from "../icons/thumb-down-outline.svg";
import edit from "../icons/ic_edit_black_24px.svg";
import deleteIcon from "../icons/ic_delete_black_24px.svg";
import Snackbar from "material-ui/Snackbar";

class PostList extends Component {
	state = {
		commentAuthor: "",
		commentBody: "",
		snackbarOpen: false,
		snackbarMessage: "",
		dialogOpen: false,
		upVote: false,
		upVoteIcon: upvoteOutline,
		downVote: false,
		downVoteIcon: downvoteOutline
	};

	componentDidMount() {
		this.props.getPost(this.props.match.params.postId);
		this.props.getAllComments(this.props.match.params.postId);
	}

	upVotePost(postId) {
		if (!this.state.upVote) {
			if (this.state.downVote) {
				this.props
					.votePost(postId, "upVote")
					.then(post => this.setState({ post: post.payload }));
			}
			this.props.votePost(postId, "upVote").then(post =>
				this.setState({
					post: post.payload,
					upVote: true,
					upVoteIcon: upvote,
					downVote: false,
					downVoteIcon: downvoteOutline
				})
			);
		} else {
			this.props.votePost(postId, "downVote").then(post =>
				this.setState({
					post: post.payload,
					upVote: false,
					upVoteIcon: upvoteOutline,
					downVote: false,
					downVoteIcon: downvoteOutline
				})
			);
		}
	}

	downVotePost(postId) {
		if (!this.state.downVote) {
			if (this.state.upVote) {
				this.props
					.votePost(postId, "downVote")
					.then(post => this.setState({ post: post.payload }));
			}
			this.props.votePost(postId, "downVote").then(post =>
				this.setState({
					post: post.payload,
					downVote: true,
					downVoteIcon: downvote,
					upVote: false,
					upVoteIcon: upvoteOutline
				})
			);
		} else {
			this.props.votePost(postId, "upVote").then(post =>
				this.setState({
					post: post.payload,
					downVote: false,
					downVoteIcon: downvoteOutline,
					upVote: false,
					upVoteIcon: upvoteOutline
				})
			);
		}
	}

	handleOpen = () => {
		this.setState({ dialogOpen: true });
	};

	handleClose = () => {
		this.setState({ dialogOpen: false });
	};

	handleSubmit = () => {
		if (!this.validate()) {
			return this.setState({
				snackbarOpen: true,
				snackbarMessage: "Comment fields can not be empty",
				dialogOpen: false
			});
		}
		this.props
			.addComment({
				id: uuid.v4(),
				body: this.state.commentBody,
				author: this.state.commentAuthor,
				parentId: this.props.post.id
			})
			.then(() => {
				this.props.getPost(this.props.match.params.postId);
				this.props.getAllComments(this.props.match.params.postId);
			});
		this.setState({
			snackbarOpen: true,
			snackbarMessage: `${this.state.commentAuthor} says "${this.state
				.commentBody}"`,
			dialogOpen: false
		});
	};

	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};

	validate() {
		if (this.state.commentAuthor === "" || this.state.commentBody === "") {
			return false;
		} else {
			return true;
		}
	}

	handleDelete() {
		this.props.deletePost(this.props.post.id).then(() => {
			this.props.history.goBack();
		});
	}

	updateCommentList(commentAuthor) {
		this.props.getPost(this.props.match.params.postId);
		this.props.getAllComments(this.props.match.params.postId);
		this.setState({
			snackbarOpen: true,
			snackbarMessage: `A comment by ${commentAuthor} is deleted`
		});
	}

	renderCommentList(comments) {
		if (!comments.length) {
			return <div>Showing 0 comments</div>;
		}
		return comments.map(comment => (
			<li
				key={comment.id}
				style={{
					listStyleType: "none",
					marginBottom: "15px"
				}}
			>
				<CommentDetail
					comment={comment}
					updateCommentList={author => this.updateCommentList(author)}
				/>
			</li>
		));
	}

	renderEmptyPost() {
		return(
			<div>
				<AppBar
					title="Readable"
					iconElementLeft={
						<IconButton
							onClick={() => {
								this.props.history.goBack();
							}}
						>
							<NavigationClose />
						</IconButton>
					}
				/>
				<div  className="error-message">
					404 - Post not found
				</div>
			</div>
		);
	}

	render() {
		const { post, comments } = this.props;

		if (_.isEmpty(post)) {
			return this.renderEmptyPost();
		}

		const actions = [
			<FlatButton
				label="Cancel"
				secondary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				onClick={this.handleSubmit}
			/>
		];

		return (
			<div>
				<AppBar
					title="Readable"
					iconElementLeft={
						<IconButton
							onClick={() => {
								this.props.history.goBack();
							}}
						>
							<NavigationClose />
						</IconButton>
					}
				/>
				<Paper className="paper" zDepth={1}>
					<div className="post-title">{post.title}</div>
					<div className="post-author">by {post.author}</div>
					<br />
					<div className="post-body">{post.body}</div>
					<br />
					<div className="count" style={{ marginLeft: "0px" }}>
						{post.voteScore} votes, {post.commentCount} comments
					</div>
					<hr style={{ opacity: "0.2" }} />
					<div className="button-section">
						<img
							src={this.state.upVoteIcon}
							alt="upvote"
							className="icon-button"
							onClick={() => this.upVotePost(post.id)}
						/>
						<img
							src={this.state.downVoteIcon}
							alt="downvote"
							className="icon-button"
							onClick={() => this.downVotePost(post.id)}
						/>
						<Link to={`/edit/${post.id}`}>
							<img
								src={edit}
								alt="edit"
								className="icon-button"
							/>
						</Link>
						<img
							src={deleteIcon}
							alt="delete"
							className="icon-button"
							onClick={() => {
								this.handleDelete();
							}}
						/>
					</div>
					<Subheader>Comments</Subheader>
					<div className="comment-section">
						<ul style={{ paddingLeft: "0px", marginTop: "0px" }}>
							{this.renderCommentList(comments)}
						</ul>
						<RaisedButton
							label="Add new Comment"
							onClick={this.handleOpen}
						/>
						<Dialog
							title="Add new Comment"
							actions={actions}
							modal={false}
							open={this.state.dialogOpen}
							onRequestClose={this.handleClose}
						>
							<TextField
								hintText="Enter your name"
								floatingLabelText="Name"
								value={this.state.commentAuthor}
								onChange={e =>
									this.setState({
										commentAuthor: e.target.value
									})}
							/>
							<br />
							<TextField
								hintText="Enter comment"
								floatingLabelText="Comment"
								fullWidth={true}
								value={this.state.commentBody}
								onChange={e =>
									this.setState({
										commentBody: e.target.value
									})}
							/>
							<br />
						</Dialog>
					</div>
				</Paper>
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

function mapStateToProps({ fetchPost, fetchAllComments }) {
	return {
		post: fetchPost,
		comments: fetchAllComments
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: postId => dispatch(getPost(postId)),
		votePost: (postId, vote) => dispatch(votePost(postId, vote)),
		getAllComments: postId => dispatch(getAllComments(postId)),
		addComment: comment => dispatch(addComment(comment)),
		deletePost: postId => dispatch(deletePost(postId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
