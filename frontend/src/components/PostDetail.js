import React, { Component } from "react";
import { connect } from 'react-redux';
import { getPost } from '../actions/posts';
import { getAllComments } from '../actions/comments';
import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from 'material-ui/Paper';
import FlatButton from "material-ui/FlatButton";
import Subheader from 'material-ui/Subheader';

class PostList extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.postId);
		this.props.getAllComments(this.props.match.params.postId)
	}
	render() {
		const { post } = this.props;
		console.log(this.props)
		return (
			<div>
				<AppBar
					title="Readable"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					iconElementLeft={
						<IconButton onClick={() => this.props.history.goBack()}>
							<NavigationClose />
						</IconButton>
					}
				/>
				<Paper className="paper" zDepth={1}>
					<div className="post-title">{post.title}</div>
					<div className="post-author">by {post.author}</div>
					<br/>
					<div className="post-body">{post.body}</div>
					<br/>
					<div className="count" style={{marginLeft: '0px'}}>
						{post.voteScore} votes,	{post.commentCount} comments
					</div>
					<hr style={{opacity: '0.2'}}/>
					<FlatButton label="Upvote" primary={true} onClick={() => console.log('upvote')}/>
					<FlatButton label="Edit" primary={true} />
					<FlatButton label="Delete" secondary={true} />
					<Subheader>Comments</Subheader>
				</Paper>
			</div>
		);
	}
}

function mapStateToProps({ fetchPost, fetchAllComments }){
	return {
		post: fetchPost,
		comments: fetchAllComments
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (postId) => dispatch(getPost(postId)),
		getAllComments: (postId) => dispatch(getAllComments(postId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
