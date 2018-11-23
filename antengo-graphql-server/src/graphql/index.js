const makeGql = require("./make");
const Main = require("./Main");
const User = require("./User");
const Listing = require("./Listing");

module.exports = makeGql(Main, User, Listing);
