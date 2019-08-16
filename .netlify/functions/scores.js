import fetch from 'node-fetch';

const scoresUrl = process.env.scores;

exports.handler = (event, context, callback) => {
	const { httpMethod } = event;
	if (httpMethod === 'GET') {
		fetch(scoresUrl)
			.then(res => res.text())
			.then(text => callback({
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
