const { supplyListing, supplyListings } = require("../../api/listings");
const get = require("lodash/get");

module.exports = {
  Query: {
    listing: (root, { params }, ctx) => supplyListing(params),
    listings: (root, { params }, ctx) => supplyListings(params)
  },
  Mutation: {
    listing_add: (root, args, ctx) => {},
    listing_update: (root, args, ctx) => {},
    listing_rm: (root, args, ctx) => {},
  },
  Listing: {
    url: ({ id, title }) => `/itemDetail/${delimit(title)}${id}`,
    location: listing => get(listing, "pin.location")
  }
}

function delimit (title="", delimiter="_") {
    var str = title.trim()
        .toLowerCase()
        .replace(/[^a-z ]/gi, "")
        .split(" ").join(delimiter);
    return str ? str+delimiter : "";
}
