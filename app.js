var DisneyWorld = require('./data.js');
var restify = require('restify');
var builder = require('botbuilder');
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
var recognizer = new builder.LuisRecognizer(model);
var prompts = require('./prompts.js')
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

// Start Server for Bot
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appid: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Start logic for bot
bot.dialog('/', dialog);


dialog.matches('GetParks', [getPark, choosePark('parks', prompts.parkUnknown)])



function getPark(session, args, next) {

	builder.Prompts.choice(session, prompts.parkMissing, DisneyWorld);

}

function choosePark(field, prompt) {
	return function(session, results) {
		if (results.response) {

			var park = session.userData.park = results.response.entity;

			// so the park has been set, now what does the user need?
			session.send(session.userData.park);

		} else {

			session.send('That did not work');
			
		}
	}
}