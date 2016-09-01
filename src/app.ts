import DisneyWorld from './data';
import * as restify from 'restify';
import * as builder from 'botbuilder';
import prompts from './prompts';

var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

// Start Server for Bot
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Start logic for bot
bot.dialog('/', dialog);
dialog.onDefault(builder.DialogAction.send(prompts.helpMessage));

dialog.matches('GetParks', [getPark, choosePark('parks', prompts.parkUnknown)])



function getPark(session, args, next) {
	// console.log(args);
	var park;
	var entity = builder.EntityRecognizer.findEntity(args.entities, 'Parks')
	if (entity) {
		park = builder.EntityRecognizer.findBestMatch(DisneyWorld, entity.entity);
	} else if (session.userData.park) {
		park = session.userData.park;

	}

	if (!session.userData.park) {
	// 	var text = entity ? session.gettext(prompts.parkUnknown, { park: entity.entity }) : prompts.parkMissing;
		builder.Prompts.choice(session, prompts.parkMissing, DisneyWorld);
	} else {
		next({ response: park})
	}
	 	


}

function choosePark(field, prompt) {
	return function(session, results) {
		if (results.response) {
			var park = session.userData.park = results.response.entity;

			// so the park has been set, now what does the user need?
			session.send(session);

		} else {

			session.send(prompts.cancel);

		}
	}
}
// make sure we have park
// make sure we have ride
// return details
dialog.matches('Description', [getPark, getDescription('park', prompts.parkDescription)]);

function getDescription(field, prompt) {
	return function parkDescription(session, results) {
	var park = session.userData.park = results.response.entity;
	console.log(park);
	var desc = DisneyWorld[park].description;
	// session.CreateMessage(prompt, )

	session.send(DisneyWorld[park].description);
	}
}


dialog.matches('Hours', [getPark, getHours('hours', prompts.parkHours)])

function getHours(field, prompt) {
	return function parkHours(session, results) {
		var park = session.userData.park = results.response.entity;
		if (park) {
			var answer = { park: park, open: DisneyWorld[park].schedule.open, close: DisneyWorld[park].schedule.close };
			session.send(prompt, answer);
		}
		else {
			session.send(prompts.helpMessage);
		}

	}
}

