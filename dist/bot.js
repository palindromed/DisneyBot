"use strict";
const parks_1 = require('./parks');
const rides_1 = require('./rides');
const restify = require('restify');
const builder = require('botbuilder');
const prompts_1 = require('./prompts');
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=25726d27-3aa1-4845-b48e-10abd0e38065&subscription-key=185095b5211448509828b620c39bb3f8';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
// Start Server for Bot
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
// Start logic for bot
bot.dialog('/', intents);
intents.onDefault(builder.DialogAction.send("Sorry. I didn't understand. Try again."));
intents.matches('Hours', [
    function (session, args, next) {
        let match;
        let park = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        let ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1.default, ride.entity);
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
        else if (park) {
            match = builder.EntityRecognizer.findBestMatch(parks_1.default, park.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1.default.queryUnknown);
            }
            else {
                let answer = {
                    park: parks_1.default[match.entity].name,
                    open: parks_1.default[match.entity].schedule.open,
                    close: parks_1.default[match.entity].schedule.open
                };
                session.send(prompts_1.default.parkHours, answer);
            }
        }
        else {
            session.send(prompts_1.default.queryUnknown);
        }
    },
]);
intents.matches('GetParks', [
    function (session) {
        builder.EntityRecognizer;
    }]);
intents.matches('Description', [
    function (session, args, next) {
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
                let answer = {
                    park: parks_1.default[match.entity].name,
                    description: parks_1.default[match.entity].description
                };
                session.send(prompts_1.default.parkDescription, answer);
            }
        }
        else {
            session.send(prompts_1.default.queryUnknown);
        }
    }
]);
