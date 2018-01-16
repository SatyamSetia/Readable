import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
//import { getAllPosts } from "../actions/posts";
//import { getCategoryPosts } from "../actions/posts";
import { getPosts } from '../actions/posts';
import PostList from './PostList';
import AppBar from "material-ui/AppBar";
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class MainPage extends Component {

	renderCategories(){
		return this.props.categories.map(category => {
			return (<li key={category.name} style={{float: 'left', listStyleType: 'none'}}>
					<FlatButton label={category.name} primary={true} onClick={() => this.handleCategoryClick(category)}/>
				</li>)
		})
	}

	handleCategoryClick(category) {
		this.props.history.push(category.path);
		this.props.getPosts(category.path);		
	}

	componentDidMount() {
		this.props.getPosts(this.props.match.url.substr(1));
	}

	render() {
		console.log("props", this.props);
		return (
			<div>
				<div>
					<AppBar
						title="Readable"
					/>
					<Subheader>Categories</Subheader>
					<ul>{this.renderCategories()}</ul>
					<br/>
					<br/>
				</div>
				<div>
					<PostList posts={this.props.posts}/>
					<Link to='/create'>
						<FloatingActionButton className="open" >
	      					<ContentAdd />
	    				</FloatingActionButton>
	    			</Link>
    			</div>
			</div>
		);
	}
}

function mapStateToProps({ fetchAllCategories, fetchPosts }) {
	//console.log(categories)
	return {
		categories: fetchAllCategories,
		posts: fetchPosts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories()),
		//getAllPosts: dispatch(getAllPosts()),
		//getCategoryPosts: (category) => dispatch(getCategoryPosts(category))
		getPosts: (category) => dispatch(getPosts(category))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
