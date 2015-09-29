import App from './app';

var app = new App();
var port = process.env.PORT || 9999;

app.start(port, () => {
	console.log(`Starting servers, listening on port ${port}...`);
});	

