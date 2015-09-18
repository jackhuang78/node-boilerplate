import React from 'react';
import {Panel, PageHeader} from 'react-bootstrap';


var Index = React.createClass({
	render: function() {
		return (
			<div>
				<Panel style={{margin: 30}}>
					<PageHeader>This is a node skeleton</PageHeader>
				</Panel>
			</div>
		);
	}
});

export default Index;