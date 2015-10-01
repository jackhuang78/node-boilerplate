import React from 'react';
import {Router, Route, RouteHandler} from 'react-router';
import {Panel, PageHeader} from 'react-bootstrap';

// define a React componenet
class Index extends React.Component {
	render() {
		return (
			<div>
				<Panel style={this.constructor.styles.panel}>
					<PageHeader>node-boilerplate</PageHeader>
					Hello
					<br/>
					<RouteHandler />  
				</Panel>
			</div>
		);
	}
}

class Home extends React.Component {
	render() {
		return (<div>home</div>);
	}
}

class About extends React.Component {
	render() {
		return (<div>about</div>);
	}
}

var routes = (
		<Route path="index" handler={Index}>
			<Route path="home" handler={Home} />
			<Route path="about" handler={About} />
		</Route>
);
//routes.props.isRoutes = true;



// CSS for Index
Index.styles = {
	panel: {
		margin: 30
	}
};

console.log(Index);
console.log(routes);

//export default Index;
export default routes;