import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import { getCategories } from "../actions/categories";
import { addPost } from "../actions/posts";

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
		category: "",
		author: "",
		title: "",
		body: "",
		snackbarOpen: false,
		message: ""
	};

	validate() {
		const { category, author, title, body } = this.state;
		if (category === "" || author === "" || title === "" || body === "") {
			return false;
		}
		return true;
	}

	handleChange = (event, index, category) => this.setState({ category });

	handleSubmit() {
		if (!this.validate()) {
			return this.setState({
				snackbarOpen: true,
				message: "Can't submit, all fields are required"
			});
		}
		this.props
			.addPost({
				id: uuid.v4(),
				category: this.state.category,
				title: this.state.title,
				author: this.state.author,
				body: this.state.body
			})
			.then(post =>
				this.setState({
					snackbarOpen: true,
					message: `A new post by ${post.payload.author} is created`,
					title: '',
					author: '',
					category: '',
					body: ''
				})
			);
		//console.log('submit')
	}

	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};

	renderCategoryMenu(categories) {
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
		//console.log(this.props);
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
					<Subheader>Add New Post</Subheader>
					<div className="add-post-form">
						<TextField
							floatingLabelText="Author"
							value={this.state.author}
							onChange={e =>
								this.setState({ author: e.target.value })}
						/>
						<br />
						<br />
						<SelectField
							floatingLabelText="Category"
							value={this.state.category}
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
							onClick={() =>
								this.setState({
									category: "",
									author: "",
									title: "",
									body: ""
								})}
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

function mapStateToProps({ fetchAllCategories }) {
	return {
		categories: fetchAllCategories.slice(1)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories()),
		addPost: post => dispatch(addPost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);
