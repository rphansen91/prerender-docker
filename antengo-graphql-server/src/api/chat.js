const fetch = require("isomorphic-fetch");
const get = require("lodash/get");
const rpcMethod = require("./rpc");

function getUnreadMessages (params) {
    return fetch(`${process.env.API_URL}/chat/rpc`, {
        method: "POST",
        body: rpcMethod("getUnreadMessages", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs"))
}

function getChats (params) {
    return fetch(`${process.env.API_URL}/chat/rpc`, {
        method: "POST",
        body: rpcMethod("getChats_v3", params)
    })
    .then(r => r.json())
    .then(r => get(r, "result.rs.chats"))
}


module.exports = {
    getUnreadMessages,
    getChats
}