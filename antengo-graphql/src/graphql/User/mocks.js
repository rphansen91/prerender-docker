module.exports = {
  User: () => ({

  }),
  Query: () => ({
    users: (_, { limit = 3 }) => new MockList(limit)
  })
};
