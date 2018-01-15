import React, { Component } from 'react';
import FlatButton from "material-ui/FlatButton";

class CommentDetail extends Component{
	render() {

		const { comment } = this.props;

		return (
			<div>
				<span className="comment-author">{comment.author} </span>
				<span className="comment-body">{comment.body}</span>
				<div className="comment-vote-score">{comment.voteScore} votes</div>
				<FlatButton
					label="Upvote"
					primary={true}
					onClick={() => console.log("upvote")}
				/>
				<FlatButton label="Edit" primary={true} />
				<FlatButton label="Delete" secondary={true} />
			</div>
		);
	}
}

export default CommentDetail;