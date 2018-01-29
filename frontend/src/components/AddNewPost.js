import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategories } from "../actions/categories";
import { addPost, getPost, editPost } from "../actions/posts";

import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

class AddNewPost extends Component {
	state = {
		editMode: false,
		category: "",
		author: "",
		title: "",
		body: "",
		snackbarOpen: false,
		message: "",
		heading: ""
	};

	componentDidMount() {
		if (this.props.match.params.postId) {
			this.props.getPost(this.props.match.params.postId).then(post => {
				const { category, author, title, body } = post.payload;
				this.setState({
					category,
					author,
					title,
					body,
					heading: "Edit Post",
					editMode: true
				});
			});
		} else {
			this.setState({ heading: "Add new Post" });
		}
	}

	validate() {
		const { category, author, title, body } = this.state;
		if (category === "" || author === "" || title === "" || body === "") {
			return false;
		}
		return true;
	}

	idGenerator() {
	  	function s4() {
	    	return Math.floor((1 + Math.random()) * 0x10000)
	      		.toString(16)
	      		.substring(1);
	  	}
	  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    	s4() + '-' + s4() + s4() + s4();
	}

	handleChange = (event, index, category) => this.setState({ category });

	handleSubmit() {
		if (!this.validate()) {
			return this.setState({
				snackbarOpen: true,
				message: "Can't submit, all fields are required"
			});
		}
		if (this.state.editMode) {
			return this.props
				.editPost(
					this.props.match.params.postId,
					this.state.title,
					this.state.body
				)
				.then(post =>
					this.setState({
						snackbarOpen: true,
						message: `A post by ${post.payload.author} is updated`
					})
				);
		}
		this.props
			.addPost({
				id: this.idGenerator(),
				category: this.state.category,
				title: this.state.title,
				author: this.state.author,
				body: this.state.body
			})
			.then(post =>
				this.setState({
					snackbarOpen: true,
					message: `A new post by ${post.payload.author} is created`,
					title: "",
					author: "",
					category: "",
					body: ""
				})
			);
	}

	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};

	handleClearClick() {
		if (!this.props.match.params.postId) {
			this.setState({
				author: "",
				category: ""
			});
		}
		this.setState({
			title: "",
			body: ""
		});
	}

	renderCategoryMenu(categories) {
		// Don't forget to add a new category object {name: 'all', path: ''}, to render all the categories here.
		return categories.map((category, index) => {
			return (
				<MenuItem
					key={index}
					value={category.name}
					primaryText={
						category.name.charAt(0).toUpperCase() +
						category.name.slice(1)
					}
				/>
			);
		});
	}

	render() {
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
					<Subheader>{this.state.heading}</Subheader>
					<div className="add-post-form">
						<TextField
							floatingLabelText="Author"
							value={this.state.author}
							disabled={this.state.editMode}
							onChange={e =>
								this.setState({ author: e.target.value })}
						/>
						<br />
						<br />
						<SelectField
							floatingLabelText="Category"
							value={this.state.category}
							disabled={this.state.editMode}
							onChange={this.handleChange}
						>
							<MenuItem
								primaryText="Choose Category"
								disabled={true}
							/>
							{this.renderCategoryMenu(this.props.categories)}
						</SelectField>
						<br />
						<TextField
							floatingLabelText="Title"
							fullWidth={true}
							value={this.state.title}
							onChange={e =>
								this.setState({ title: e.target.value })}
						/>
						<br />
						<TextField
							floatingLabelText="Write Something"
							fullWidth={true}
							multiLine={true}
							rows={2}
							rowsMax={4}
							value={this.state.body}
							onChange={e =>
								this.setState({ body: e.target.value })}
						/>
						<br />
						<br />
						<RaisedButton
							label="Clear"
							className="add-post-form-button"
							onClick={() => this.handleClearClick()}
						/>
						<RaisedButton
							label="Submit"
							className="add-post-form-button"
							onClick={() => this.handleSubmit()}
						/>
					</div>
				</Paper>
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.message}
					autoHideDuration={4000}
					onRequestClose={this.handleSnackbarClose}
				/>
			</div>
		);
	}
}

function mapStateToProps({ fetchPost, fetchAllCategories }) {
	return {
		post: fetchPost,
		categories: fetchAllCategories.slice(1)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: postId => dispatch(getPost(postId)),
		getAllCategories: dispatch(getCategories()),
		addPost: post => dispatch(addPost(post)),
		editPost: (postId, title, body) =>
			dispatch(editPost(postId, title, body))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);
