import DisneyWorld from './data';
import * as restify from 'restify';
import * as builder from 'botbuilder';
import prompts from './prompts';

var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Start Server for Bot
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);


// Start logic for bot
bot.dialog('/', intents);

intents.onDefault(builder.DialogAction.send("Sorry. I didn't understand. Try again."));

// // intents.onDefault([
// // 	function (session, args, next) {
// // 		builder.DialogAction.send("Sorry. I didn't understand. Try again.");
		
// // 	},
// // 	function (session, results, next) {

// // 	},
// // 	function (session, results) {

// // 	}
// // 	])

        // Prompt for task name
        // if (!match) {
        //     builder.Prompts.choice(session, "Which Ride/park did you want to get hours for?", DisneyWorld);
        // } else {
        //     session.send( match );
			
        // }

intents.matches('Hours', [
	function (session, args, next) {

		let match;
        let parks = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
		let ride =  builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        if (ride) {
            let mMatch = builder.EntityRecognizer.findBestMatch(DisneyWorld["MagicKingdom"].rides, ride.entity);
			let hMatch = builder.EntityRecognizer.findBestMatch(DisneyWorld["HollywoodStudio"].rides, ride.entity);
			console.log(hMatch, mMatch, 'match');
			if (hMatch) {
				var answer = { 
					park: DisneyWorld["HollywoodStudio"].rides[hMatch.entity], 
					open: DisneyWorld["HollywoodStudio"].rides[hMatch.entity].schedule.open,
					close: DisneyWorld["HollywoodStudio"].rides[hMatch.entity].schedule.close 
				};
				
			} else if (mMatch) {
				console.log(mMatch);
					var answer = { 
					park: DisneyWorld["MagicKingdom"].rides[mMatch.entity].name,
					open: DisneyWorld["MagicKingdom"].rides[mMatch.entity].schedule.open,
					close: DisneyWorld["MagicKingdom"].rides[mMatch.entity].schedule.close 
				};
				
			}
			session.send(prompts.parkHours, answer);

        } else if (parks) {

		}
        

    },

]);




			// var answer = { park: park, open: DisneyWorld[park].schedule.open, close: DisneyWorld[park].schedule.close };
			// session.send(prompt, answer);



intents.matches('GetParks', [
	function (session) {
		// session.send(DisneyWorld)
		builder.EntityRecognizer
}])