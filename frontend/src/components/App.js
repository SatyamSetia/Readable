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

function mapStateToProps ({fetchAllCategories}) {
	//console.log(categories)
	return {
		categories: fetchAllCategories
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: dispatch(getCategories())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
