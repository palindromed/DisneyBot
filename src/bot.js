"use strict";
var parks_1 = require('./parks');
var rides_1 = require('./rides');
var restify = require('restify');
var builder = require('botbuilder');
var prompts_1 = require('./prompts');
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
        var match;
        var parks = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        var ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1["default"], ride.entity);
            // session.privateConversationData.topic = ride;
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                var answer = {
                    park: rides_1["default"][match.entity].name,
                    open: rides_1["default"][match.entity].schedule.open,
                    close: rides_1["default"][match.entity].schedule.open
                };
                session.send(prompts_1["default"].parkHours, answer);
            }
        }
        else if (parks) {
            match = builder.EntityRecognizer.findBestMatch(parks_1["default"], parks.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                var answer = {
                    park: parks_1["default"][match.entity].name,
                    open: parks_1["default"][match.entity].schedule.open,
                    close: parks_1["default"][match.entity].schedule.close
                };
                session.send(prompts_1["default"].parkHours, answer);
            }
        }
        else {
            // Get topic
            var parkTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Parks');
            var rideTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Rides');
            console.log(parkTopic, rideTopic);
            if (rideTopic) {
                match = builder.EntityRecognizer.findBestMatch(rides_1["default"], rideTopic.entity);
                // session.privateConversationData.topic = ride;
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1["default"].queryUnknown);
                }
                else {
                    var answer = {
                        park: rides_1["default"][match.entity].name,
                        open: rides_1["default"][match.entity].schedule.open,
                        close: rides_1["default"][match.entity].schedule.open
                    };
                    session.send(prompts_1["default"].parkHours, answer);
                }
            }
            else if (parkTopic) {
                match = builder.EntityRecognizer.findBestMatch(parks_1["default"], parkTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1["default"].queryUnknown);
                }
                else {
                    var answer = {
                        park: parks_1["default"][match.entity].name,
                        open: parks_1["default"][match.entity].schedule.open,
                        close: parks_1["default"][match.entity].schedule.close
                    };
                    session.send(prompts_1["default"].parkHours, answer);
                }
            }
        }
    },
]);
intents.matches('GetParks', [
    function (session) {
        builder.EntityRecognizer;
    }]);
intents.matches('Description', [
    function (session, args, next) {
        var match;
        var ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        var park = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1["default"], ride.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                var answer = {
                    park: rides_1["default"][match.entity].name,
                    description: rides_1["default"][match.entity].description
                };
                session.send(prompts_1["default"].parkDescription, answer);
            }
        }
        else if (park) {
            match = builder.EntityRecognizer.findBestMatch(parks_1["default"], park.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                session.privateConversationData.topic = args.entities;
                var answer = {
                    park: parks_1["default"][match.entity].name,
                    description: parks_1["default"][match.entity].description
                };
                session.send(prompts_1["default"].parkDescription, answer);
            }
        }
        else {
            var rideTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Rides');
            var parkTopic = builder.EntityRecognizer.findEntity(session.privateConversationData.topic, 'Parks');
            if (rideTopic) {
                match = builder.EntityRecognizer.findBestMatch(rides_1["default"], rideTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1["default"].queryUnknown);
                }
                else {
                    var answer = {
                        park: rides_1["default"][match.entity].name,
                        description: rides_1["default"][match.entity].description
                    };
                    session.send(prompts_1["default"].parkDescription, answer);
                }
            }
            else if (parkTopic) {
                match = builder.EntityRecognizer.findBestMatch(parks_1["default"], parkTopic.entity);
                if (!match) {
                    // send an error msg or default
                    session.send(prompts_1["default"].queryUnknown);
                }
                else {
                    var answer = {
                        park: parks_1["default"][match.entity].name,
                        description: parks_1["default"][match.entity].description
                    };
                    session.send(prompts_1["default"].parkDescription, answer);
                }
            }
        }
    }
]);
intents.matches('ListRides', [
    function (session, args, next) {
        var match;
        var ride = builder.EntityRecognizer.findEntity(args.entities, 'Rides');
        var parks = builder.EntityRecognizer.findEntity(args.entities, 'Parks');
        if (ride) {
            match = builder.EntityRecognizer.findBestMatch(rides_1["default"], ride.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                var answer = {
                    park: rides_1["default"][match.entity].park,
                    ride: rides_1["default"][match.entity].name
                };
                session.send(prompts_1["default"].getPark, answer);
            }
        }
        else if (parks) {
            match = builder.EntityRecognizer.findBestMatch(parks_1["default"], parks.entity);
            if (!match) {
                // send an error msg or default
                session.send(prompts_1["default"].queryUnknown);
            }
            else {
                var rideObj_1 = parks_1["default"][match.entity].rides;
                var myRides = Object.keys(rideObj_1).map(function (k) { return rideObj_1[k].name; });
                var answer = {
                    park: parks_1["default"][match.entity].name,
                    rides: myRides
                };
                session.send(prompts_1["default"].listRides, answer);
            }
        }
        else {
            session.send(prompts_1["default"].queryUnknown);
        }
    }
]);
