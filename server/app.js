// create an express app
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8888;
var bodyParser = require('body-parser');
var router = require('./router/router');
var uploadRouter = require('./router/upload');
var compression = require('compression');
var Config = require('./config/config');
var fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// compress static files
app.use(compression());

// static files
app.use('/static', express.static(Config.root + 'static'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api', uploadRouter);

// main entry file
const mainEntry = path.join(Config.root + 'front/index.html');

// route handler for GET /
app.get('/', function(req, res) {
	fs.readFile(mainEntry, function(err, data) {
		if (err) {
			console.error(err);
			res.writeHead(500, {
				'Content-Type': 'text/html'
			});
			res.end('500 server error');
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.end(data);
		}
	});
});

app.listen(port);

console.log('server started on port %s', port);