import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import request from 'request';
import url from 'url';
import uuid from 'uuid';

var app = express();
var port = process.env.PORT || 9999;



// set static path
app.use(express.static('node_modules'));
app.use(express.static('build/client'));

// set parsers
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set view and view engine
app.set('views', 'src/client');
app.set('view engine', 'ejs');

// server is up!
app.get('/', (req, res) => {
	//console.log('hey');
	res.send('Hello World!');
});

// echoes the parameters back
app.post('/echo/:p1/:p2?', (req, res) => {
	res.cookie('session', uuid.v4());
	//console.log(res.cookie, res.cookies);
	res.status(200).json({
		params: req.params,
		query: req.query,
		cookie: req.cookies,
		body: req.body,
		headers: req.headers
	});
});

// create a dummy request to POST /echo
app.get('/echo/test', (req, res) => {
	request.post({
		url: url.format({
			protocol: 'http', 
			hostname: 'localhost', 
			port: 9999, 
			pathname: '/echo/myParam', 
			query: {
				q1: 'string', q2: 123, q3: true
			}
		}),
		json: {
			f1: 'field1', f2: 456, f3: false, f4: {}, f5: []
		}
	}, (error, response, body) => {
		res.json({
			method: response.request.method,
			url: response.request.uri.href,
			statusCode: response.statusCode,
			headers: response.headers,
			body: body
		});
	});
});

// show a page with React component
app.get('/index', (req, res) => {
	res.render('main', {react: 'Index'});
});

// if(!process.env.TEST) {
// 	app.listen(port, () => {
// 		console.log(`Listening on port ${port}...`);
// 	});	
// }

export default app;


//console.log(server);


