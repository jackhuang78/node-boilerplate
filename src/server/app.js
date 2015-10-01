import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import request from 'request';
import url from 'url';
import uuid from 'uuid';


class App {

	/**
	 * Create an app that contains an Express server. 
	 * Initialize all REST handlers.
	 * @class App
	 * 
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

		/**
		 * @api {get} / Helle World!
		 * @apiGroup App
		 * @apiSuccess (200 OK) {String} - Hello World!
		 * @apiSuccessExample 200 OK
		 * 	Hello World!
		 * 	
		 */
		this.app.get('/hello', (req, res) => {
			return res.send('Hello World!');
		});

		
		/**
		 * @api {post} /echo/:p1/:p2?
		 * @apiGroup App
		 * @apiParam {String} p1 Path parameter 1.
		 * @apiParam {String} [p2] Path parameter 2.
		 * @apiParam {String} [q1] Query parameter 1.
		 * @apiParam {String} [q2] Query parameter 2.
		 * @apiParam {application/json} [body] 
		 * @apiParam {String} [body.f1] Field 1.
		 * @apiParam {Number} [body.f2] Field 1.
		 * @apiParam {Boolean} [body.f3] Field 1.
		 * 
		 *
		 */
		this.app.post('/echo/:p1/:p2?', (req, res) => {
			res.cookie('session', uuid.v4());
			return res.status(200).json({
				params: req.params,
				query: req.query,
				cookie: req.cookies,
				body: req.body,
				headers: req.headers
			});
		});

		// show a page with React component
		this.app.get('/index', (req, res) => {
			return res.render('main', {title: 'node-boilerplate', react: 'Index'});
		});
	}

	/**
	 * Start the App as a server.
	 * @method App#start
	 * @param  {Number} [port=9999] The port to run the server on.
	 * @return {Promise.<Number>} The port number of the server.
	 */
	start(port = 9999) {
		return new Promise((res, rej) => {
			this.server = this.app.listen(port)
			.on('listening', () => {
				return res(port);
			}).on('error', (err) => {
				err.meta = {port: port};
				return rej(err);
			});
		});
		
	}

	/**
	 * Stop the server.
	 * @method App#stop
	 * @return {Promise} 
	 * 
	 */
	stop(cb) {
		return new Promise((res, rej) => {
			if(!this.server)
				return rej(new Error('ENOTRUNNING'));
			
			return this.server.close(res());
		});
		
	}
}



export default App;


