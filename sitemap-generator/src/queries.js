const listingsQuery = `
  {
    listings(params: {}) {
      url
      createdDate
    }
  }
`

module.exports = {
  listingsQuery
}