"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    helpMessage: "DisneyBot can answer questions about the parks that are a part of Walt Disney World.  Here are some of the things you can ask:\n\n" +
        "* 'tell me about Magic Kingdom'\n" +
        "* 'how many parks are there in Disney World?'\n" +
        "* 'when does Animal Kingdom open?'\n" +
        "* 'when does Splash Mountain close?'\n" +
        "\nOnce you ask a question about a park you can ask followup questions about the same park.",
    // getPark: "Choose a park fr?om the list",
    queryUnknown: "I don't know that one. Try another query.",
    parkClose: "%(park)s closes at %(time)s.",
    parkOpen: "%(park)s opens at %(time)s.",
    parkDescription: "Here is a little information about %(park)s:\n%(description)s",
    parkHours: "%(park)s is open from %(open)s until %(close)s",
    listRides: "%(park)s has the following rides:\n%(rides)s",
    getPark: "%(ride)s is in %(park)s"
};
