'use strict';

const _ = require('underscore');

module.exports = function RequestMock() {
	return {
		getValue: 'application/json; charset=utf-8; custom-value=1234',
		acceptsValue: 'JSON',
		method: 'get',
		get() {
			return this.getValue;
		},
		accepts(values) {
			return _.find(values, (item) => item.toUpperCase() === this.acceptsValue.toUpperCase());
		}
	};
};
