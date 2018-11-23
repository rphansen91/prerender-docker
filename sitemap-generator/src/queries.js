const supplyListingsQuery = `
  {
    supplyListings(params: {}) {
      url
      createdDate
    }
  }
`

module.exports = {
  supplyListingsQuery
}