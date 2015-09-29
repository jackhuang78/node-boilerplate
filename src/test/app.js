import assert from 'assert';
import request from 'request';
import colors from 'colors';

import App from '../server/app';

describe('App.js', () => {
	var app = new App();
	var port = 8888;

	before((done) => {
		
		app.start(port).then((port) => {
			console.log(`*** Server started on localhost:${port} ***`.yellow);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	
	describe('# GET /', () => {
		it('should return "Hello World!"', (done) => {
			request.get({
				url: `http://localhost:${port}`
			}, (error, response, body) => {
				assert.ifError(error);
				assert.strictEqual(response.statusCode, 200);
				assert.strictEqual(body, 'Hello World!');
				done();
			});
		});
	});

	describe('# POST /echo', () => {
		it('should return param, query, request body in the response body', (done) => {
			request.post({
				url: `http://localhost:${port}/echo/param1/param2?q1=query1&q2=query2`,
				body: {f1: 'field1', f2: 'field2'},
				json: true
			}, (error, response, body) => {
				assert.ifError(error);
				assert.equal(response.statusCode, 200);
				assert.notEqual(body, null);
				assert.deepEqual(body.params, {p1: 'param1', p2: 'param2'});
				assert.deepEqual(body.query, {q1: 'query1', q2: 'query2'});
				assert.deepEqual(body.body, {f1: 'field1', f2: 'field2'});
				done();
			});
		});
	});

	after((done) => {
		app.stop().then(() => {
			console.log(`*** Server stopped ***`.yellow);
			done();
		});
		// app.stop(() => {
		// 	console.log(`*** Server stopped ***`.yellow);
		// 	done();
		// });
	});
});
