import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { voteComment, editComment, deleteComment } from "../actions/comments";

import upvote from "../icons/ic_thumb_up_black_24px.svg";
import upvoteOutline from "../icons/thumb-up-outline.svg";
import downvote from "../icons/ic_thumb_down_black_24px.svg";
import downvoteOutline from "../icons/thumb-down-outline.svg";
import edit from "../icons/ic_edit_black_24px.svg";
import deleteIcon from "../icons/ic_delete_black_24px.svg";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class CommentDetail extends Component {
	state = {
		comment: {},
		commentBody: '',
		upVote: false,
		upVoteIcon: upvoteOutline,
		dialogOpen: false,
		downVote: false,
		downVoteIcon: downvoteOutline
	};

	upVoteComment(commentId) {
		if (!this.state.upVote) {
			if (this.state.downVote) {
				this.props
					.voteComment(commentId, "upVote")
					.then(comment =>
						this.setState({ comment: comment.payload })
					);
			}
			this.props.voteComment(commentId, "upVote").then(comment =>
				this.setState({
					comment: comment.payload,
					upVote: true,
					upVoteIcon: upvote,
					downVote: false,
					downVoteIcon: downvoteOutline
				})
			);
		} else {
			this.props.voteComment(commentId, "downVote").then(comment =>
				this.setState({
					comment: comment.payload,
					upVote: false,
					upVoteIcon: upvoteOutline,
					downVote: false,
					downVoteIcon: downvoteOutline
				})
			);
		}
	}

	downVoteComment(commentId) {
		if (!this.state.downVote) {
			if (this.state.upVote) {
				this.props
					.voteComment(commentId, "downVote")
					.then(comment =>
						this.setState({ comment: comment.payload })
					);
			}
			this.props.voteComment(commentId, "downVote").then(comment =>
				this.setState({
					comment: comment.payload,
					downVote: true,
					downVoteIcon: downvote,
					upVote: false,
					upVoteIcon: upvoteOutline
				})
			);
		} else {
			this.props.voteComment(commentId, "upVote").then(comment =>
				this.setState({
					comment: comment.payload,
					downVote: false,
					downVoteIcon: downvoteOutline,
					upVote: false,
					upVoteIcon: upvoteOutline
				})
			);
		}
	}

	validate() {
		if(this.state.commentBody === ''){
			return false;
		}
		return true;
	}

	handleOpen = () => {
		this.setState({ dialogOpen: true, commentBody: this.state.comment.body });
	};

	handleClose = () => {
		this.setState({ dialogOpen: false });
	};

	handleSubmit = () => {
		if(!this.validate()){
			return 
		}
		this.props.editComment(this.state.comment.id, this.state.commentBody).then(comment =>
			this.setState({
				comment: comment.payload,
				dialogOpen: false
			}))
	}

	handleDelete(author) {
		this.props.deleteComment(this.state.comment.id).then(() =>
			this.props.updateCommentList(author))
	}

	componentDidMount() {
		if (_.isEmpty(this.state.comment)) {
			this.setState({ comment: this.props.comment });
		}
	}

	render() {
		const { comment } = this.state;

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
				<span className="comment-author">{comment.author} </span>
				<span className="comment-body">{comment.body}</span>
				<div className="comment-vote-score">
					{comment.voteScore} votes
				</div>
				<div className="button-section">
					<img
						src={this.state.upVoteIcon}
						alt="upvote"
						className="icon-button"
						onClick={() => this.upVoteComment(comment.id)}
					/>
					<img
						src={this.state.downVoteIcon}
						alt="downvote"
						className="icon-button"
						onClick={() => this.downVoteComment(comment.id)}
					/>
					<img
						src={edit}
						alt="edit"
						className="icon-button"
						onClick={() => {this.handleOpen()}}
					/>
					<img
						src={deleteIcon}
						alt="delete"
						className="icon-button"
						onClick={() => this.handleDelete(comment.author)}
					/>
				</div>
				<Dialog
					title="Edit Comment"
					actions={actions}
					modal={false}
					open={this.state.dialogOpen}
					onRequestClose={this.handleClose}
				>
					<TextField
						floatingLabelText="Name"
						value={comment.author}
						disabled={true}
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
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		voteComment: (commentId, vote) => dispatch(voteComment(commentId, vote)),
		editComment: (commentId, commentBody) => dispatch(editComment(commentId, commentBody)),
		deleteComment: (commentId) => dispatch(deleteComment(commentId))
	};
}

export default connect(null, mapDispatchToProps)(CommentDetail);
