const { gql } = require("apollo-server");

module.exports = gql`
  input ChatQuery {
    page: Int = 1
  }

  input ChatInput {
    name: String
  }

  type Chat {
    name: String
    id: String,
    listingId: String
    listingType: Int
    ownerId: String
    participantId: String
    lastMessageId: String
    lastSenderId: String
    updatedDate: String
    lastMessageText: String
    ownerNewMessages: Int
    participantNewMessages: Int
    dataSourceName: String
    senderId: String
    email: String
    senderUsername: String
    lstitle: String
    hasPhoto: Int
    readMessages: Int
    companion: User
    me: User
    listing: Listing
  }

  extend type Query {
    chat: Chat
    unread: Int
    chats (params: ChatQuery = {}): [Chat]
  }

  extend type Mutation {
    chat_add (input: ChatInput): Chat
    chat_update (id: String, input: ChatInput): Chat
    chat_rm (id: String): Boolean
  }
`
