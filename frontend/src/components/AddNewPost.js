import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

class AddNewPost extends Component {
	state = {
		value: 0
	};

	handleChange = (event, index, value) => this.setState({ value });

	renderCategoryMenu(categories) {
		return categories.map((category, index) => {
			return (
				<MenuItem
					key={index}
					value={index}
					primaryText={
						category.name.charAt(0).toUpperCase() +
						category.name.slice(1)
					}
				/>
			);
		});
	}

	render() {
		console.log(this.props);
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
						<TextField floatingLabelText="Author" />
						<br />
						<br />
						<SelectField
							floatingLabelText="Category"
							value={this.state.value}
							onChange={this.handleChange}
						>
							<MenuItem
								primaryText="Choose Category"
								disabled={true}
							/>
							{this.renderCategoryMenu(this.props.categories)}
						</SelectField>
						<br />
						<TextField floatingLabelText="Title" />
						<br />
						<TextField
							floatingLabelText="Write Something"
							fullWidth={true}
							multiLine={true}
							rows={2}
							rowsMax={4}
						/>
						<br />
						<br />
						<RaisedButton label="Clear" className="add-post-form-button"/>
						<RaisedButton label="Submit" className="add-post-form-button"/>
					</div>
				</Paper>
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
		getAllCategories: dispatch(getCategories())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);
