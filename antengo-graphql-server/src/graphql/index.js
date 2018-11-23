const makeGql = require("./make");
const Main = require("./Main");
const Chat = require("./Chat");
const User = require("./User");
const Listing = require("./Listing");

module.exports = makeGql(Main, User, Listing, Chat);
