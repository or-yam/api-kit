const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


let app;

function createApp() {
	app = express()
	if (process.env.NODE_ENV !== 'production') {
		app.use(require('morgan')('combined'))
	}
	app.use(cors())
	app.use(bodyParser.json())

	return app;
}

function startApp(serviceName = 'APP', port = process.env.PORT, ip = (process.env.IP || '127.0.0.1')) {
	app.set('port', port)
	app.set('ip', ip)

	// start the server
	return new Promise((resolve) => {
		app.listen(port, ip, () => {
			console.log(`${serviceName} is running on port ${port}`);
			resolve();
		});
	})
}

module.exports = {
	app: () => app || createApp(),
	start: startApp
}
