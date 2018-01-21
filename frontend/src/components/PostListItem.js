import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { votePost } from "../actions/posts";
import open from "../icons/ic_open_in_new_black_18px.svg";
import upvote from "../icons/ic_thumb_up_black_24px.svg";
import upvoteOutline from "../icons/thumb-up-outline.svg";
import downvote from "../icons/ic_thumb_down_black_24px.svg";
import downvoteOutline from "../icons/thumb-down-outline.svg";
import edit from "../icons/ic_edit_black_24px.svg";
import deleteIcon from "../icons/ic_delete_black_24px.svg";

import { Card, CardActions, CardHeader } from "material-ui/Card";

class PostListItem extends Component {
	state = {
		post: {},
		upVote: false,
		upVoteIcon: upvoteOutline,
		downVote: false,
		downVoteIcon: downvoteOutline
	};

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

	componentDidMount() {
		if (_.isEmpty(this.state.post)) {
			this.setState({ post: this.props.post });
		}
	}

	render() {
		const { post } = this.state;
		return (
			<div>
				<Card>
					<CardHeader
						title={post.title}
						subtitle={post.author}
						actAsExpander={false}
						showExpandableButton={false}
					/>
					<CardActions>
						<div className="count">
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
							<Link to={`/edit/${post.id}`} >
								<img src={edit} alt="edit" className="icon-button"/>
							</Link>
							<img src={deleteIcon} alt="delete" className="icon-button" onClick={() => {}} />
							<Link to={`${post.category}/${post.id}`} >
								<img
									src={open}
									alt="open"
									style={{ float: "right" }}
								/>
							</Link>
						</div>
					</CardActions>
				</Card>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		votePost: (postId, vote) => dispatch(votePost(postId, vote))
	};
}

export default connect(null, mapDispatchToProps)(PostListItem);
