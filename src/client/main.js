import $ from 'jquery';
import React from 'react';
import Router from 'react-router';

// load all React components
var components = {};
components.Index = require('./Index');


// render React components
var Component = components[$('#content').attr('react')];
console.log(3, Component);

if(false) {
	React.render(<Component />, document.body);
} else {
	Router.run(Component, Router.HistoryLocation, (Handler) => {
  	React.render(<Handler />, document.body);
	});
}

// React.render(
// 	<Component />, document.body
// );


// React.render((<Router>
// 		<Route path="/" component={Component}>
// 		</Route>
// 	</Router>), document.body);

//React.render(<Router routes={{path:'/', component: Component}}></Router>, document.body);

