import React, { Component } from 'react';
import AppBar from "material-ui/AppBar";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";

class AddNewPost extends Component {
	render() {
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
			</div>
		);
	}
}

export default AddNewPost;