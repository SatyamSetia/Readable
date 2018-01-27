import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MainPage from "./MainPage";
import AddNewPost from "./AddNewPost";
import PostDetail from "./PostDetail";

function App() {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/create" component={AddNewPost} />
          <Route exact path="/edit/:postId" component={AddNewPost} />
          <Route exact path="/" component={MainPage} />
          <Route path="/:category/:postId" component={PostDetail} />
          <Route path="/:category" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
