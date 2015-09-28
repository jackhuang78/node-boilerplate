import assert from 'assert';
import request from 'request';
import app from '../server/app';
import colors from 'colors';

describe('App.js', () => {
  var server = null;
  before((done) => {
    server = app.listen(8888, () => {
      console.log('*** Server started ***'.yellow);
      done();
    });
  });

  
  describe('# GET /', () => {
    it('should return "Hello World!"', (done) => {
      request.get({
        url: 'http://localhost:9999'
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
        url: 'http://localhost:9999/echo/param1/param2?q1=query1&q2=query2',
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
    server.close(() => {
      console.log('*** Server stopped ***'.yellow);
      done();
    });
  });
});
