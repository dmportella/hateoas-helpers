'use strict';
/* global describe, it, before, beforeEach, after, afterEach */

const expect = require('expect.js');
const helpers = require('../index.js');

describe('check-methods', () => {
	const response = require('./response');
	const request = require('./request');

	describe('checkMethod', () => {
		it('allow call on correct method', (done) => {
			const req = request();
			const res = response();
			helpers.checkMethod(['GET'], req, res, () => done());
		});

		it('disallow call on incorrect method', () => {
			const req = request();
			const res = response();
			helpers.checkMethod(['POST'], req, res, () => expect().fail());

			expect(res.statusValue).to.eql(405);
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

	describe('checkType', () => {
		it('allow call of correct type', (done) => {
			const req = request();
			const res = response();
			helpers.checkType(['application/json'], req, res, () => done());
		});

		it('disallow call on incorrect type', () => {
			const req = request();
			const res = response();
			helpers.checkType(['application/xml'], req, res, () => expect().fail());

			expect(res.statusValue).to.eql(415);
			expect(res.sendValue).to.eql(
				{
					status: 'Unsupported Media Type',
					statuscode: 415,
					allowed: 'application/xml'
				});
		});

		it('disallow call on undefined type', () => {
			const req = request();
			const res = response();

			req.getValue = undefined;

			helpers.checkType(['application/xml'], req, res, () => expect().fail());

			expect(res.statusValue).to.eql(415);
			expect(res.sendValue).to.eql(
				{
					status: 'Unsupported Media Type',
					statuscode: 415,
					allowed: 'application/xml'
				});
		});
	});

	describe('checkAccept', () => {
		it('allow call of correct type', (done) => {
			const req = request();
			const res = response();
			helpers.checkAccept(['json', 'text', 'html'], req, res, () => done());
		});

		it('disallow call on incorrect type', () => {
			const req = request();
			const res = response();

			req.acceptsValue = 'mp4';

			helpers.checkAccept(['json', 'text', 'html'], req, res, () => expect().fail());

			expect(res.statusValue).to.eql(406);
			expect(res.sendValue).to.eql(
				{
					status: 'Not Acceptable',
					statuscode: 406,
					allowed: 'json,text,html'
				});
		});
	});
});
