import colors from 'colors';
import App from './app';

var app = new App();

app.start(process.env.PORT).then((port) => {
	console.log(`Starting servers, listening on port ${port}...`.green);
}).catch((err) => {
	if(err.code === 'EADDRINUSE')
		console.log(`Failed to start application; port ${err.meta.port} already in use.`.red);
	else
		console.log(`Failed to start application; ${err}`.red);
});	

