const supplyListingsQuery = `
  {
    listings(params: {}) {
      url
      createdDate
    }
  }
`

module.exports = {
  supplyListingsQuery
}