# Websockets Demo

## Intro

- This app functions as test functionality for the escapelink backend.
- It is setup to work with this repo: https://github.com/escape-link/escapelink-be
- That repo operates on http://localhost:3000/.

## Steps to Use

### Backend App:

1. Install Ruby 3.2.2 on your local machine and configure it globally.
2. Clone this repo to your local machine: https://github.com/escape-link/escapelink-be
3. In the rails app directory, in terminal enter:`bundle install`
4. In the rails app directory, in terminal enter:`rails db:{drop,create,migrate,seed}`
5. The rails server runs on http://localhost:3000/ so ensure this port is available.
6. In the rails app directory, in terminal enter:`rails s` to start the server.

### Frontend App (this app):

1. Clone this repo to your local machine.
2. In the react app directory, in terminal enter:`npm install` to install the dependencies in package.json.
3. This runs on http://localhost:3001/ so ensure this port is available.
4. Run `npm start` AFTER starting the backend rails server.
5. Go to http://localhost:3001/ to start the react app.

