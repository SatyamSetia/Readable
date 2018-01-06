import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions/index';

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
	console.log(categories)
	return {
		categories: categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
