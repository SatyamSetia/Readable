import React, { Component } from "react";
import { connect } from 'react-redux';
import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from 'material-ui/Paper';
import { getPost } from '../actions/posts';

class PostList extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.postId)
	}
	render() {
		const { post } = this.props;
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
					{post.title}
				</Paper>
			</div>
		);
	}
}

function mapStateToProps({ fetchPost }){
	return {
		post: fetchPost
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (postId) => dispatch(getPost(postId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
