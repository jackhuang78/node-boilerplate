import $ from 'jquery';
import React from 'react';

// load all React components
var components = {};
components.Index = require('./Index');


// render React components
var Component = components[$('#content').attr('react')];
React.render(
	<Component />, document.body
);