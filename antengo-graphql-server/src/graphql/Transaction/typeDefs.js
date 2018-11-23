const { gql } = require("apollo-server");

module.exports = gql`
  input TransactionQuery {
    name: String
  }

  input TransactionInput {
    name: String
  }

  type Transaction {
    name: String
  }

  extend type Query {
    transaction: Transaction
    transactions (input: TransactionQuery, page: Paginate): [Transaction]
    transactions_count (input: TransactionQuery): Int
  }

  extend type Mutation {
    transaction_add (input: TransactionInput): Transaction
    transaction_update (id: String, input: TransactionInput): Transaction
    transaction_rm (id: String): Boolean
  }
`
