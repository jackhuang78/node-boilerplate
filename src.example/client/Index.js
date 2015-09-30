import React from 'react';
import {Panel, PageHeader} from 'react-bootstrap';

// define a React componenet
class Index extends React.Component {
	render() {
		return (
			<div>
				<Panel style={this.constructor.styles.panel}>
					<PageHeader>node-boilerplate</PageHeader>
					Hello
				</Panel>
			</div>
		);
	}
}



// CSS for Index
Index.styles = {
	panel: {
		margin: 30
	}
};


export default Index;