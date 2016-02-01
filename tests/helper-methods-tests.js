'use strict';

const expect = require('expect.js');
const helpers = require('../index.js');
const _ = require('underscore');

describe('helpers-core', function() {
	const response = function() {
		return {
			status: 0,
			sendValue: undefined,
			setValues: undefined,
			status(code) {
				this.status = code;
				return this;
			},
			send(param1) {
				this.sendValue = param1;
			},
			set(param1, param2) {
				this.setValues = {
					key: param1,
					value: param2
				};
			}
		};
	};

	const request = function() {
		return {
			getValue: 'application/json',
			acceptsValue: 'JSON',
			method: 'get',
			get(header) {
				return this.getValue;
			},
			accepts(values) {
				return _.find(values, (item) => item.toUpperCase() === this.acceptsValue.toUpperCase());
			}
		};
	};

	describe('return204', function() {
		it('return 204 successfully', function() {
			let res = response();
			helpers.return204(undefined, undefined, res, undefined);
			expect(res.status).to.eql(204);
		});

		it('return 204 returns error', function(done) {
			let res = response();
			const error = new Error();
			helpers.return204(error, undefined, res, (err) => { expect(err).to.eql(error); done(); });
		});
	});

	describe('checkMethod', function() {
		it('allow call on correct method', function(done) {
			let req = request();
			let res = response();
			helpers.checkMethod(['GET'], req, res, () => done());
		});

		it('disallow call on incorrect method', function() {
			let req = request();
			let res = response();
			helpers.checkMethod(['POST'], req, res, (err) => expect().fail());

			expect(res.status).to.eql(405);
			expect(res.setValues).to.eql(
				{
					key: 'Allow',
					value: 'POST'
				});
			expect(res.sendValue).to.eql(
				{
					status: 'Method Not Allowed',
					statuscode: 405,
					allowed: 'POST'
				});
		});
	});

	describe('checkType', function() {
		it('allow call of correct type', function(done) {
			let req = request();
			let res = response();
			helpers.checkType(['application/json'], req, res, () => done());
		});

		it('disallow call on incorrect type', function() {
			let req = request();
			let res = response();
			helpers.checkType(['application/xml'], req, res, (err) => expect().fail());

			expect(res.status).to.eql(415);
			expect(res.sendValue).to.eql(
				{
					status: 'Unsupported Media Type',
					statuscode: 415,
					allowed: 'application/xml'
				});
		});
	});

	describe('checkAccept', function() {
		it('allow call of correct type', function(done) {
			let req = request();
			let res = response();
			helpers.checkAccept([ 'json', 'text', 'html' ], req, res, () => done());
		});

		it('disallow call on incorrect type', function() {
			let req = request();
			let res = response();

			req.acceptsValue = "mp4";

			helpers.checkAccept([ 'json', 'text', 'html' ], req, res, (err) => expect().fail());

			expect(res.status).to.eql(406);
			expect(res.sendValue).to.eql(
				{
					status: 'Not Acceptable',
					statuscode: 406,
					allowed: 'json,text,html'
				});
		});
	});
});