module.exports = {
  Listing: () => ({

  }),
  Query: () => ({
    listings: (_, { limit = 3 }) => new MockList(limit)
  })
};
