const fetch = require("isomorphic-fetch");
const get = require("lodash/get");
const rpcMethod = require("./rpc");

function supplyListings (params) {
    return fetch(`${process.env.API_URL}/supplylisting/rpc`, {
        method: "POST",
        body: rpcMethod("search", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs"))
}

function supplyListing (params) {
    return fetch(`${process.env.API_URL}/supplylisting/rpc`, {
        method: "POST",
        body: rpcMethod("getById", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs[0]"))
}

module.exports = {
    supplyListings,
    supplyListing
}