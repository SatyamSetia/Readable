import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MainPage from "./MainPage";
import PostList from "./PostList";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={MainPage}/>
              <Route path="/:category" component={PostList} />
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
