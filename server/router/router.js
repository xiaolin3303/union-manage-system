var express = require('express');
var DataModel = require('../model/datamodel');
var ObjectId = require('mongodb').ObjectID;

// get an instance of the express Router
var router = express.Router();

router.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

router.get('/list', function(req, res) {
	DataModel.query('collections').then((result) => {
		res.json(result);
	}).catch((err) => {
		res.status(500).send({
			message: '500 server error'
		});
	});
});

router.get('/list/:cat', function(req, res) {
	var query = {
		cat: req.params.cat
	};
	DataModel.query('collections', query).then((result) => {
		res.json(result);
	}).catch((err) => {
		res.status(500).send({
			message: '500 server error'
		});
	});
});

router.get('/detail/:id', function(req, res) {
	var query = {
		_id: ObjectId(req.params.id)
	};
	DataModel.queryOne('collections', query).then((result) => {
		if (result) {
			res.json(result);
		} else {
			res.status(404).send({
				message: 'not find'
			});
		}
	}).catch((err) => {
		res.status(500).send({
			message: '500 server error'
		});
	});
});

router.put('/detail/:id', function(req, res) {
	var query = {
		_id: ObjectId(req.params.id)
	};
	DataModel.queryOne('collections', query).then((result) => {
		return Promise.resolve(result);
	}).then(result => {
		if (result) {
			var update = {
				like: result.like + 1
			};

			DataModel.update('collections', query, update).then((result) => {
				if (result) {
					res.json(result);
				}
			}).catch((err) => {
				res.status(500).send({
					message: '500 server error'
				});
			});
		}
	}).catch((err) => {
		res.status(500).send({
			message: '500 server error'
		});
	});
});

module.exports = router;