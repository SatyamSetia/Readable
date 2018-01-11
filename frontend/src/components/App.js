import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MainPage from "./MainPage";
//import PostList from "./PostList";
import PostDetail from "./PostDetail";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter >
          <div>
            <Route exact path="/" component={MainPage}/>
            <Route path="/:category/:postId" component={PostDetail} />
            <Route path="/:category" component={MainPage} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
