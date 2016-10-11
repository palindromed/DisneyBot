"use strict";
const parks_1 = require('./parks');
const rides_1 = require('./rides');
const restify = require('restify');
const builder = require('botbuilder');
const prompts_1 = require('./prompts');
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
        (session, args, next) => {
        let match;
        let parks = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        let ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1.default, ride.entity);
            // session.privateConversationData.topic = ride;
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                let answer = {
                    park: rides_1.default[match.entity].name,
                    open: rides_1.default[match.entity].schedule.open,
                    close: rides_1.default[match.entity].schedule.open
                };
                session.send(prompts_1.default.parkHours, answer);
            }
        }
        else if (parks) {
            match = builder.EntityRecognizer.findBestMatch(parks_1.default, parks.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                let answer = {
                    park: parks_1.default[match.entity].name,
                    open: parks_1.default[match.entity].schedule.open,
                    close: parks_1.default[match.entity].schedule.close
                };
                session.send(prompts_1.default.parkHours, answer);
            }
        }
        else {
            // Get topic
            let parkTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Parks');
            let rideTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Rides');
            console.log(parkTopic, rideTopic);
            if (rideTopic) {
                match = builder.EntityRecognizer.findBestMatch(rides_1.default, rideTopic.entity);
                // session.privateConversationData.topic = ride;
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1.default.queryUnknown);
                }
                else {
                    let answer = {
                        park: rides_1.default[match.entity].name,
                        open: rides_1.default[match.entity].schedule.open,
                        close: rides_1.default[match.entity].schedule.open
                    };
                    session.send(prompts_1.default.parkHours, answer);
                }
            }
            else if (parkTopic) {
                match = builder.EntityRecognizer.findBestMatch(parks_1.default, parkTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1.default.queryUnknown);
                }
                else {
                    let answer = {
                        park: parks_1.default[match.entity].name,
                        open: parks_1.default[match.entity].schedule.open,
                        close: parks_1.default[match.entity].schedule.close
                    };
                    session.send(prompts_1.default.parkHours, answer);
                }
            }
        }
    },
]);
intents.matches('GetParks', [
        (session) => {
        builder.EntityRecognizer;
    }]);
intents.matches('Description', [
        (session, args, next) => {
        let match;
        let ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        let park = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1.default, ride.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                let answer = {
                    park: rides_1.default[match.entity].name,
                    description: rides_1.default[match.entity].description
                };
                session.send(prompts_1.default.parkDescription, answer);
            }
        }
        else if (park) {
            match = builder.EntityRecognizer.findBestMatch(parks_1.default, park.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                let answer = {
                    park: parks_1.default[match.entity].name,
                    description: parks_1.default[match.entity].description
                };
                session.send(prompts_1.default.parkDescription, answer);
            }
        }
        else {
            let rideTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Rides');
            let parkTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Parks');
            if (rideTopic) {
                match = builder.EntityRecognizer.findBestMatch(rides_1.default, rideTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1.default.queryUnknown);
                }
                else {
                    let answer = {
                        park: rides_1.default[match.entity].name,
                        description: rides_1.default[match.entity].description
                    };
                    session.send(prompts_1.default.parkDescription, answer);
                }
            }
            else if (parkTopic) {
                match = builder.EntityRecognizer.findBestMatch(parks_1.default, parkTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1.default.queryUnknown);
                }
                else {
                    let answer = {
                        park: parks_1.default[match.entity].name,
                        description: parks_1.default[match.entity].description
                    };
                    session.send(prompts_1.default.parkDescription, answer);
                }
            }
        }
    }
]);
intents.matches('ListRides', [
        (session, args, next) => {
        let match;
        let ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        let parks = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1.default, ride.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                let answer = {
                    park: rides_1.default[match.entity].park,
                    ride: rides_1.default[match.entity].name
                };
                session.send(prompts_1.default.getPark, answer);
            }
        }
        else if (parks) {
            match = builder.EntityRecognizer.findBestMatch(parks_1.default, parks.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                let rideObj = parks_1.default[match.entity].rides;
                let myRides = Object.keys(rideObj).map(function (k) { return rideObj[k].name; });
                let answer = {
                    park: parks_1.default[match.entity].name,
                    rides: myRides
                };
                session.send(prompts_1.default.listRides, answer);
            }
        }
        else {
            session.send(prompts_1.default.queryUnknown);
        }
    }
]);
