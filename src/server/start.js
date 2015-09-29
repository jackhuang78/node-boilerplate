import app from './app';

var port = process.env.PORT || 9999;
app.listen(port, () => {
	console.log(`Starting servers, listening on port ${port}...`);
});	

