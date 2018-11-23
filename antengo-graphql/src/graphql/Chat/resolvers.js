const { getUnreadMessages, getChats } = require("../../api/chat");

module.exports = {
  Query: {
    chat: (root, args, ctx) => {},
    unread: (root, args, { token }) => getUnreadMessages({ token }),
    chats: (root, { params }, { token }) => getChats(Object.assign({ token }, params)),
  },
  Mutation: {
    chat_add: (root, args, ctx) => {},
    chat_update: (root, args, ctx) => {},
    chat_rm: (root, args, ctx) => {},
  },
  Chat: {

  }
}
