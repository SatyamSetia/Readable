import React, { Component } from "react";
import CommentDetail from "./CommentDetail";
import { connect } from "react-redux";
import { getPost, votePost } from "../actions/posts";
import { getAllComments } from "../actions/comments";
import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

class PostList extends Component {
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		this.props.getPost(this.props.match.params.postId);
		this.props.getAllComments(this.props.match.params.postId);
	}
	render() {
		const { post, comments } = this.props;
		console.log(this.props);

		const actions = [
			<FlatButton
				label="Cancel"
				secondary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				onClick={this.handleClose}
			/>
		];

		return (
			<div>
				<AppBar
					title="Readable"
					iconElementLeft={
						<IconButton onClick={() => this.props.history.goBack()}>
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
					<FlatButton
						label="Upvote"
						primary={true}
						onClick={() => {this.props.votePost(post.id, 'upVote')}}
					/>
					<FlatButton label="Edit" primary={true} />
					<FlatButton label="Delete" secondary={true} />
					<Subheader>Comments</Subheader>
					<div className="comment-section">
						<ul style={{paddingLeft: '0px', marginTop: '0px'}}>
							{comments.map(comment => (
								<li key={comment.id} style={{listStyleType: 'none', marginBottom: '15px'}}>
									<CommentDetail comment={comment} />
								</li>
							))}
						</ul>
						<RaisedButton
							label="Add new Comment"
							onClick={this.handleOpen}
						/>
						<Dialog
							title="Add new Comment"
							actions={actions}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}
						>
							<TextField
								hintText="Enter your name"
								floatingLabelText="Name"
							/>
							<br />
							<TextField
								hintText="Enter comment"
								floatingLabelText="Comment"
								fullWidth={true}
							/>
							<br />
						</Dialog>
					</div>
				</Paper>
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
		votePost: (postId, vote) => dispatch(votePost(postId,vote)),
		getAllComments: postId => dispatch(getAllComments(postId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
