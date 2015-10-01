import React from 'react';
import {Router, Route, RouteHandler} from 'react-router';
import {Panel, PageHeader, Nav, NavItem} from 'react-bootstrap';

// define a React componenet
class Index extends React.Component {
	render() {
		console.log(this.props.location);
		return (
			<div>
				<Panel style={this.constructor.styles.panel}>
					<PageHeader>node-boilerplate</PageHeader>
					<Nav bsStyle='tabs' activeKey={this.props.location.pathname}>
						{/*<NavItem eventKey='' href=''>Index</NavItem>*/}
						<NavItem eventKey='/home' href='#home'>Home</NavItem>
						<NavItem eventKey='/about' href='#about'>About</NavItem>
					</Nav>
					<br/>
					{this.props.children}
				</Panel>
			</div>
		);
	}
}

class Home extends React.Component {
	render() {
		return (<h2>home</h2>);
	}
}

class About extends React.Component {
	render() {
		return (<h2>about</h2>);
	}
}

class R extends React.Component {
	render() {
		return (
			<Router>
				<Route path="/" component={Index}>
					<Route path="home" component={Home} />
					<Route path="about" component={About} />
				</Route>
			</Router>
		);
	}
}


// CSS for Index
Index.styles = {
	panel: {
		margin: 30
	}
};


export default R;
