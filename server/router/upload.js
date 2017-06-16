var express = require('express');
var Config = require('../config/config');

module.exports = (function() {
    var uploadRouter = express.Router();

	// uploda files
	uploadRouter.post('/upload', function(req, res) {
		if (!req.files)
			return res.status(400).send('No files were uploaded.');

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
		var sampleFile = req.files.sampleFile;

		// Use the mv() method to place the file somewhere on your server 
		sampleFile.mv(Config.root + 'upload/' + sampleFile.name, function(err) {
			if (err)
				return res.status(500).send(err);

			res.send('File uploaded!');
		});
	});

    return uploadRouter;
})();