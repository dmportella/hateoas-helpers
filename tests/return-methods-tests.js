'use strict';
/* global describe, it, before, beforeEach, after, afterEach */

const expect = require('expect.js');
const helpers = require('../index.js');

describe('return-methods', () => {
	const response = require('./response');

	describe('return204', () => {
		it('return 204 successfully', () => {
			const res = response();
			helpers.return204(undefined, undefined, res, undefined);
			expect(res.statusValue).to.eql(204);
		});

		it('return 204 returns error', (done) => {
			const res = response();
			const error = new Error();
			helpers.return204(error, undefined, res, (err) => { expect(err).to.eql(error); done(); });
		});
	});

	describe('return400', () => {
		it('return 400 successfully', () => {
			const res = response();
			helpers.return400(undefined, undefined, res, undefined);
			expect(res.statusValue).to.eql(400);
		});

		it('return 400 returns error', (done) => {
			const res = response();
			const error = new Error();
			helpers.return400(error, undefined, res, (err) => { expect(err).to.eql(error); done(); });
		});
	});
});
