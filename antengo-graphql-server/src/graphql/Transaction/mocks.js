module.exports = {
  Transaction: () => ({

  }),
  Query: () => ({
    transactions: (_, { limit = 3 }) => new MockList(limit)
  })
};
