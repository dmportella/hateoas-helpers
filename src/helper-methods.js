const _ = require('underscore');

module.exports = function HelperMethods() {
	return {
		checkAccept(allowed, req, res, next) {
			if (req.accepts(allowed) === undefined) {
				res.status(406).send(
					{
						status: 'Not Acceptable',
						statuscode: 406,
						allowed: allowed.join()
					});
			} else {
				next();
			}
		},
		checkType(allowed, req, res, next) {
			const contentType = req.get('Content-Type');
			if (contentType === undefined ||
				((contentType !== undefined) &&
					!_.find(allowed, (item) => item.toUpperCase() === contentType.toUpperCase()))) {
				res.status(415).send(
					{
						status: 'Unsupported Media Type',
						statuscode: 415,
						allowed: allowed.join(),
						provided: contentType
					});
				return;
			}
			next();
		},
		checkMethod(allowed, req, res, next) {
			const method = req.method.toUpperCase();
			if (!_.find(allowed, (item) => item.toUpperCase() === method)) {
				res.set('Allow', allowed.join());
				res.status(405).send(
					{
						status: 'Method Not Allowed',
						statuscode: 405,
						allowed: allowed.join(),
						provided: method
					});
				return;
			}

			next();
		},
		return204(err, req, res, next) {
			if (err) {
				next(err);
			} else {
				res.status(204).send();
			}
		},
		return400(err, req, res, next) {
			if (err) {
				next(err);
			} else {
				res.status(400).send(
					{
						status: 'Bad Request',
						statuscode: 400
					});
			}
		}
	};
};
