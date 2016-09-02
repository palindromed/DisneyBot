import DisneyParks from './parks';
import DisneyRides from './rides';
import * as restify from 'restify';
import * as builder from 'botbuilder';
import prompts from './prompts';

let model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
let recognizer = new builder.LuisRecognizer(model);
let intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Start Server for Bot
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);


// Start logic for bot
bot.dialog('/', intents);

intents.onDefault(builder.DialogAction.send("Sorry. I didn't understand. Try again."));

intents.matches('Hours', [
	 (session: builder.Session, args: any, next: any) => {
		let match: any;
        let parks: builder.IEntity = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
		let ride: builder.IEntity =  builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        if (ride) {
			match = builder.EntityRecognizer.findBestMatch(DisneyRides, ride.entity);

			if (!match) {
				// send an error msg or default
				session.send( prompts.queryUnknown);
			} else {
			let answer = {
				park: DisneyRides[match.entity].name,
				open: DisneyRides[match.entity].schedule.open,
				close: DisneyRides[match.entity].schedule.open
			}
			session.send(prompts.parkHours, answer);

     
			}
        } else if (parks) {
			match = builder.EntityRecognizer.findBestMatch(DisneyParks, parks.entity);

			if (!match) {
				// send an error msg or default
				session.send(prompts.queryUnknown)
			} else {
			let answer = {
				park: DisneyParks[match.entity].name,
				open: DisneyParks[match.entity].schedule.open,
				close: DisneyParks[match.entity].schedule.close
			}
			session.send(prompts.parkHours, answer);

     
			}
		} else {
			session.send(prompts.queryUnknown);
		}
    },

]);


intents.matches('GetParks', [
	 (session) => {
		builder.EntityRecognizer
}])

intents.matches('Description', [
	(session, args, next) => {
		let match: any;
		let ride: builder.IEntity =  builder.EntityRecognizer.findEntity(args.entities, 'Rides');
		let park: builder.IEntity =  builder.EntityRecognizer.findEntity(args.entities, 'Parks');
		if (ride) {
		match = builder.EntityRecognizer.findBestMatch(DisneyRides, ride.entity);

			if (!match) {
				// send an error msg or default
				session.send( prompts.queryUnknown);
			} else {
			let answer = {
				park: DisneyRides[match.entity].name,
				description: DisneyRides[match.entity].description
			}

			session.send(prompts.parkDescription, answer);
			}
		} else if (park) {
		match = builder.EntityRecognizer.findBestMatch(DisneyParks, park.entity);

			if (!match) {
				// send an error msg or default
				session.send(prompts.queryUnknown)
			} else {
			let answer = {
				park: DisneyParks[match.entity].name,
				description: DisneyParks[match.entity].description
			}
			session.send(prompts.parkDescription, answer);

		
			}
		} else {
			session.send(prompts.queryUnknown);
		}
	}
])

intents.matches('ListRides', [
	(session, args, next) => {
		let match: any;
		let ride: builder.IEntity =  builder.EntityRecognizer.findEntity(args.entities, 'Rides');
		let parks: builder.IEntity =  builder.EntityRecognizer.findEntity(args.entities, 'Parks');
			if (ride) {
				match = builder.EntityRecognizer.findBestMatch(DisneyRides, ride.entity);

				if (!match) {
					// send an error msg or default
					session.send( prompts.queryUnknown);
				} else {
				let answer = {
					park: DisneyRides[match.entity].park,
					ride: DisneyRides[match.entity].name
				}

				session.send(prompts.getPark, answer);
				}
		} else if (parks) {
			match = builder.EntityRecognizer.findBestMatch(DisneyParks, parks.entity);

			if (!match) {
				// send an error msg or default
				session.send(prompts.queryUnknown)
			} else {
			let answer = {
				park: DisneyParks[match.entity].name,
				rides: DisneyParks[match.entity].parks
			}
			session.send(prompts.listRides, answer);

		
			}
		} else {
			session.send(prompts.queryUnknown);
		}
	}

])