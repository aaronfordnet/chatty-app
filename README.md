# TalkBox App

A responsive real-time chat app built with React and WebSockets.

!["TalkBox app interface"](https://raw.githubusercontent.com/aaronfordnet/chatty-app/master/docs/TalkBoxUsage.gif)

## To Install

1. Clone this repository
2. Navigate to ``/talkbox_app`` and install all dependencies by running ``npm install``
3. Navigate to ``/talkbox_server`` and install all dependencies by running ``npm install``

## To Run

1. In a terminal window, navigate to ``/talkbox_app`` and run ``npm start``
2. In a separate terminal window, navigate to ``/talkbox_server`` and run ``node server.js``
3. In a browser, navigate to ``http://localhost:3000/``
4. Chat away!

## App Dependencies
- react
- react-dom

### App Dev Dependencies
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- eslint
- eslint-plugin-react
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server

## Server Dependencies
- express
- ws
- uuid
