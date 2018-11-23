const fetch = require("isomorphic-fetch");
const get = require("lodash/get");
const values = require("lodash/values");
const assign = require("lodash/assign");
const merge = require("lodash/merge");
const rpcMethod = require("./rpc");

function getPublicProfile (params) {
    return fetch(`${process.env.API_URL}/user/rpc`, {
        method: "POST",
        body: rpcMethod("getPublicProfile", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs"))
    .then(({ user, listings }) => assign({}, user, { 
        listings: values(listings) 
    }))
}

function getPrivateProfile (params) {
    return fetch(`${process.env.API_URL}/user/rpc`, {
        method: "POST",
        body: rpcMethod("getPrivateProfile", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs"))
    .then(user => 
        getPublicProfile({ userId: user.id })
        .then(public => merge({}, public, user))
    )
}

module.exports = {
    getPublicProfile,
    getPrivateProfile
}