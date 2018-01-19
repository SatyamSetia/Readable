import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';

import { votePost } from "../actions/posts";
import open from "../icons/ic_open_in_new_black_18px.svg";

import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class PostListItem extends Component {

	state = {
		post: {},
		vote: 'upVote'
	}

	voteScoreUpdate(postId) {
		this.props.votePost(postId, this.state.vote).then(post => this.setState({post: post.payload}));
		if(this.state.vote === 'upVote'){
			this.setState({ vote: 'downVote'})
		} else {
			this.setState({ vote: 'upVote'})
		}
	}

	componentDidMount() {
		if(_.isEmpty(this.state.post)){
			this.setState({post: this.props.post})
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
						<FlatButton
							label={this.state.vote}
							primary={true}
							onClick={() => this.voteScoreUpdate(post.id)}
						/>
						<FlatButton label="Edit" primary={true} />
						<FlatButton label="Delete" secondary={true} />
						<Link to={`${post.category}/${post.id}`}>
							<img
								src={open}
								alt="open"
								style={{ float: "right", marginTop: "10px" }}
							/>
						</Link>
					</CardActions>
				</Card>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		votePost: (postId, vote) => dispatch(votePost(postId,vote))
	}
}

export default connect(null, mapDispatchToProps)(PostListItem);
