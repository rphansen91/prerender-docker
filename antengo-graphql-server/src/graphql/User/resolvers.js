const { getPublicProfile, getPrivateProfile } = require("../../api/user");

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

  }
}
