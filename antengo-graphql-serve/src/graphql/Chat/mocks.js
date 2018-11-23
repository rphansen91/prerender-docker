module.exports = {
  Chat: () => ({

  }),
  Query: () => ({
    chats: (_, { limit = 3 }) => new MockList(limit)
  })
};
