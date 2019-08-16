const fetch = require('node-fetch');

exports.handler = (event, context, callback) => {
	const { httpMethod } = event;
	if (httpMethod === 'GET') {
		const scoresUrl = process.env.scores;
		fetch(scoresUrl)
			.then(res => res.text())
			.then(text => callback(null, {
				headers: {
					'Content-Type': 'application/json'
				},
				body: text
			}))
	}
	return {
		statusCode: 404
	}
}
