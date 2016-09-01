var DisneyWorld = require('./data.js');
var restify = require('restify');
var builder = require('botbuilder');
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
var recognizer = new builder.LuisRecognizer(model);
var prompts = require('./prompts.js')
var intents = new builder.IntentDialog({ recognizers: [recognizer] });


// Start Server for Bot
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});


var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', intents);

intents.onDefault(builder.DialogAction.send("Sorry. I didn't understand. Try again."));

// intents.onDefault([
// 	function (session, args, next) {
// 		builder.DialogAction.send("Sorry. I didn't understand. Try again.");
		
// 	},
// 	function (session, results, next) {

// 	},
// 	function (session, results) {

// 	}
// 	])

intents.matches('Hours', [
	function (session, args, next) {
		if (args.entities) {
			console.log('we have entities');

		}
		console.log(args);
		// .entities[0].entity, args.entities[0].type
		// if (args.entities[0].type == 'Parks') {
			// var park = args.entities[0].entity;
			// park = park.replace( /\s+/g, '');
			// var answer = { park: park, open: DisneyWorld[park].schedule.open, close: DisneyWorld[park].schedule.close };
			// session.send(prompt, answer);
		// }
		// what do they want hours for? 
		// is it a  park or ride?
		// which park or ride
	}
])

intents.matches('GetParks', [
	function (session) {

	}])