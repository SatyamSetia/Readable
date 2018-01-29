# Readable Project

This project is completed as a part of React & Redux course in React Nanodegree from Udacity. It has adding post, comments on post, upvoting and downvoting on both posts and comments like features.

This repository includes the code for the backend [`API Server`](./api-server) and [`front-end`](./frontend) portion of the project.

## What You're Getting
```bash
├── README.md - This file.
├── api-server # contains code for handling backend api request.
└── frontend # contains React-Redux part of project.
```

## Instructions to launch

To launch the project right away:

* Install and start the API server
    - `cd api-server`
    - add a new add category object as shown in Important section below.
    - `npm install`
    - `node server`
* In another terminal window
    - `npm install`
    - `npm install --save react-router-dom react-redux redux redux-thunk material-ui lodash`
    - `npm start`

## Important

The backend API provides a fixed set of categories which can be found in [categories.js](./api-server/categories.js). For the project to have required functionalities a new category object with name: 'all' and path: '' must be added to default categories as follows:
```bash
The new categories array should look like this:

categories: [
      {
        name: 'all',
        path: ''
      },
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
  ]
```

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
