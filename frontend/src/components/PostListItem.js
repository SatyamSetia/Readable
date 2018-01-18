import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';

import { getPost, votePost } from "../actions/posts";
import open from "../icons/ic_open_in_new_black_18px.svg";

import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class PostListItem extends Component {

	state = {
		vote: 'upVote'
	}

	voteScoreUpdate(postId) {
		//console.log(this.props.votePost(postId, this.state.vote));
		this.props.votePost(postId, this.state.vote);
		if(this.state.vote === 'upVote'){
			this.setState({ vote: 'downVote'})
		} else {
			this.setState({ vote: 'upVote'})
		}
		this.props.postUpdate();
		//this.setState({post: this.props.getPost(postId)})
	}

	// componentWillMount() {
	// 	this.props.getPost(this.props.postId);
	// 	//console.log(this.props.postId);
	// 	//console.log(this.props)
	// }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return nextState.post !== this.props.post;
	// }

	// componentDidMount() {
	// 	if(_.isEmpty(this.state.post)){
	// 		this.setState({post: this.props.post},() => console.log(this.state.post))
	// 	}
	// }

	render() {
		// this.props.getPost(this.props.postId);
		const { post } = this.props;
		console.log(this.props)
		//console.log(this.props.post)
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

// function mapStateToProps({ fetchPost }) {
// 	return {
// 		post: fetchPost
// 	}
// }

function mapDispatchToProps(dispatch) {
	return {
		//getPost: postId => dispatch(getPost(postId)),
		votePost: (postId, vote) => dispatch(votePost(postId,vote))
	}
}

export default connect(null, mapDispatchToProps)(PostListItem);
