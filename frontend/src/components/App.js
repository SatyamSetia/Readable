import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
  	console.log('props', this.props)
    return (
      <div>
        Hello World!!
      </div>
    );
  }
}

function mapStateToProps (categories) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(App);
