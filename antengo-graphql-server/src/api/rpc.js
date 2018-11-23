module.exports = function rpcMethod (method, params) {
    return JSON.stringify({
        id: "0",
        method,
        params
    })
}