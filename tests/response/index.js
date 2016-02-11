'use strict';

module.exports = function ResponseMock() {
	return {
		statusValue: 0,
		sendValue: undefined,
		setValues: undefined,
		status(code) {
			this.statusValue = code;
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
