import React, { Component } from "react";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Subheader from 'material-ui/Subheader';
//import { connect } from 'react-redux';

class PostList extends Component {
	renderPost(post) {
		return (
			<li
				key={post.id}
				style={{
					width: "90%",
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
					/>
					<CardActions>
						<FlatButton label="Edit" primary={true} />
						<FlatButton label="Delete" secondary={true} />
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
