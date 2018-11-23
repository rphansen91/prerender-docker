const { getPublicProfile, getPrivateProfile } = require("../../api/user");
const { getUnreadMessages, getChats } = require("../../api/chat");

module.exports = {
  Query: {
    me: (root, args, { token }) => getPrivateProfile({ token }),
    user: (root, { params }, ctx) => getPublicProfile(params),
    users: (root, args, ctx) => {},
  },
  Mutation: {
    user_add: (root, args, ctx) => {},
    user_update: (root, args, ctx) => {},
    user_rm: (root, args, ctx) => {},
  },
  User: {
    unread: (root, args, { token }) => getUnreadMessages({ token }),
    chats: (root, { params }, { token }) => getChats(Object.assign({ token }, params)),
  }
}
