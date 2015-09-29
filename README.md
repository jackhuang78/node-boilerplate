# node-boilerplate
A Node.js project setup with React and ES6.

## Motivation
This project contains all the modules, tools, and code templates that I commonly to write a Node.js server, so that I don't have to setup everything over and over.

## Contents
### Tools
- [git](https://git-scm.com/) - version control
- [npm](https://www.npmjs.com/) - module management
- [gulp](http://gulpjs.com/) - build tasks
- [mocha](https://mochajs.org/) - unit testing
- [babel](https://babeljs.io/) - ES6 compiler
- [browserify](http://browserify.org/)/[watchify](https://www.npmjs.com/browse/keyword/watchify) - code bundling for browser
- [nodemon](http://nodemon.io/) - hot loading server
- [eslint](http://eslint.org/) - js/jsx linter

### Modules
- [Express](http://expressjs.com/) - server setup
- [Request](https://github.com/request/request) - HTTP requests from server
- [React](https://facebook.github.io/react/) - data-driven UI
- [Bootstrap](http://getbootstrap.com/) - UI styling
- [jQuery](https://jquery.com/) - HTTP request from UI


## Setup
### Download
    git clone https://github.com/jhuang78/node-boilerplate.git
    npm install
    npm install -g gulp

### Test
    gulp test

### Build Backend & Run (watch mode)
    gulp start
    
### Bundle Frontend (watch mode)
    gulp bundle

### Play with it
    curl localhost:9999
    curl localhost:9999/echo/test
    open http://localhost:9999/index
