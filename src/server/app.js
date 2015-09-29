import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import request from 'request';
import url from 'url';
import uuid from 'uuid';


class App {

	/**
	 * Create an app that contains an Express server. Initialize all REST handlers.
	 * @class App
	 */
	constructor() {
		
		// Express instance
		this.app = express();

		// set static path
		this.app.use(express.static('node_modules'));
		this.app.use(express.static('build/client'));

		// set parsers
		this.app.use(cookieParser());
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());

		// set view and view engine
		this.app.set('views', 'src/client');
		this.app.set('view engine', 'ejs');

		// server is up!
		this.app.get('/', (req, res) => {
			res.send('Hello World!');
		});

		// echoes the parameters back
		this.app.post('/echo/:p1/:p2?', (req, res) => {
			res.cookie('session', uuid.v4());
			res.status(200).json({
				params: req.params,
				query: req.query,
				cookie: req.cookies,
				body: req.body,
				headers: req.headers
			});
		});

		// show a page with React component
		this.app.get('/index', (req, res) => {
			res.render('main', {title: 'node-boilerplate', react: 'Index'});
		});
	}

	/**
	 * Start the App as a server.
	 * @method App#start
	 * @param  {Number} [port=9999] The port to run the server on.
	 * @param  {App~startCallback} [cb] Callback.
	 */
	start(port = 9999) {
		return new Promise((res, rej) => {
			this.server = this.app.listen(port)
			.on('listening', () => {
				res(port);
			}).on('error', (err) => {
				err.meta = {port: port};
				rej(err);
			});
		});
		
	}

	/**
	 * Stop the server.
	 * @method App#stop
	 * @return {Promise} promise.
	 */
	stop(cb) {
		return new Promise((res, rej) => {
			this.server.close(res());
		});
		
	}
}



export default App;


