import React, { Component } from "react";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Subheader from 'material-ui/Subheader';
//import commentIcon from "../icons/ic_comment_black_24px.svg";
import open from '../icons/ic_open_in_new_black_18px.svg';
//import { connect } from 'react-redux';

class PostList extends Component {
	renderPost(post) {
		return (
			<li
				key={post.id}
				style={{
					width: "95%",
					marginBottom: "20px",
					listStyleType: "none"
				}}
			>
				<Card>
					<CardHeader
						title={post.title}
						subtitle={post.author}
						actAsExpander={false}
						showExpandableButton={false}
						onClick = {() => console.log(post.id)}
					/>						
					<CardActions>
						<div className="count">
							{post.voteScore} votes,	{post.commentCount} comments
						</div>
						<hr style={{opacity: '0.2'}}/>
						<FlatButton label="Upvote" primary={true} onClick={() => console.log('upvote')}/>
						<FlatButton label="Edit" primary={true} />
						<FlatButton label="Delete" secondary={true} />
						<img src={open} alt="open" style={{float: 'right', marginTop: '10px'}}/>
					</CardActions>
				</Card>
			</li>
		);
	}

	render() {
		return (
			<div>
				<Subheader>Posts</Subheader>
				<ul>{this.props.posts.map(post => this.renderPost(post))}</ul>
			</div>
		);
	}
}

// function mapDispatchToProps(dispatch) {
// 	return  {
// 		getPosts
// 	}
// }

//export default connect()(PostList);
export default PostList;
