import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./MainPage";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Route exact path="/" component={MainPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
