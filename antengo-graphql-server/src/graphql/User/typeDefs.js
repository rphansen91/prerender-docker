const { gql } = require("apollo-server");

module.exports = gql`
  input UserById {
    userId: String!
  }

  input UserQuery {
    name: String
  }

  input UserInput {
    name: String
  }

  type User {
    banned: Int
    carrierId: Int
    email: String
    firstName: String
    has_photo: Int
    id: String
    isAllowSms: Boolean
    isPhoneVerified: Boolean
    lastName: String
    membershipType: Int
    photos: [Photo]
    trustLevel: Int
    userType: Int
    username: String
    listings: [Listing]
  }

  extend type Query {
    me: User
    user (params: UserById): User
    users (params: UserQuery): [User]
  }

  extend type Mutation {
    user_add (input: UserInput): User
    user_update (id: String, input: UserInput): User
    user_rm (id: String): Boolean
  }
`
