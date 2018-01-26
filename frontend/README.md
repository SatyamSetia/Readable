# Readable Project

This project is completed as a part of React & Redux course in React Nanodegree from Udacity. It has adding post, comments on post, upvoting and downvoting on both posts and comments like features. API requests are responded by ../api-server (Provided by Udacity)

## TL;DR

To launch this project on your machine:

* clone this repository.
* install all project dependencies with `npm install`
* install some other packages with `npm install --save react-router-dom react-redux redux redux-thunk uuid material-ui lodash`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions
    │   ├── categories.js # actions for category
    │   ├── comments.js # actions for comments
    │   └── posts.js # actions for posts
    ├── components
    │   ├── AddNewPost.js # component for rendering add new post page and edit post page.
    │   ├── App.js # parent component.
    │   ├── CommentDetail.js # component for rendering single comment.
    │   ├── MainPage.js # component for rendering home page
    │   ├── PostDetail.js # component fr rendering single post on /:category/:postId
    │   └── PostListItem.js # component for rendering single post on root route     
    ├── icons # Folder containing required icons.
    ├── reducers 
    │   ├── categories.js # reducer for category
    │   ├── comments.js # reducer for comments
    │   ├── index.js # root reducer
    │   └── posts.js # reducer for posts
    ├── utils
    │   └── index.js # api requests.
    ├── App.css # required css by App.js
    ├── App.test.js
    ├── index.css # required css by complete app.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    └── registerServiceWorker.js
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`server.js`](../api-server/server.js) contains the methods you will need to perform necessary operations on the backend.

## Important
The backend API provides a fixed set of categories which can be found in [categories.js](../api-server/categories.js). New Categories can added from here.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
