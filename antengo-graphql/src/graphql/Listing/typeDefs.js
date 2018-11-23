const { gql } = require("apollo-server");

module.exports = gql`
  input ListingById {
    id: String!
    longitude: Float = -117.23035890000001
    latitude: Float = 33.112052999999996
  }

  input ListingQuery {
    q: String = ""
    minPrice: Float = 0
    maxPrice: Float = 0
    distanceStart: Float = 0
    distance: Float = 25000
    longitude: Float = -117.23035890000001
    latitude: Float = 33.112052999999996
    shippable: Int = 1
    membershipType: Int = 5
    dataSourceId: Int = 0
    categoryGroupId: Int = 0
    categoryId: Int = 0
    page: Int = 1
    hasPhoto: Boolean = true
  }

  input ListingInput {
    name: String
  }

  type Photo {
    url: String
  }

  type Location {
    lat: Float 
    lon: Float
  }

  type Listing {
    categoryGroupId: Int
    categoryId: Int
    dataSourceId: Int
    createdDate: String
    featuredDate: String
    cost: Float
    price: Float
    distance: Float
    full_text: String
    has_photo: Boolean
    id: String
    interest_count: Int
    listingType: Int
    photo_count: Int
    photos: [Photo]
    location: Location
    shippable: Int
    sortDate: String
    status: Int
    text: String
    title: String
    user: User
    url: String
    videoUrl: String
  }

  extend type Query {
    listing (params: ListingById): Listing
    listings (params: ListingQuery): [Listing]
  }

  extend type Mutation {
    listing_add (input: ListingInput): Listing
    listing_update (id: String, input: ListingInput): Listing
    listing_rm (id: String): Boolean
  }
`
