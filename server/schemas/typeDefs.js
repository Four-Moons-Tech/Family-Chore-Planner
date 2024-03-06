const typeDefs = `
  type User {
    _id: ID
    username: String
    lastName: String
    email: String
    role: Selection
    children: [User]
    
  }

  type Chore {
    choreId: ID
    description: String!
    payRate: Float!
    dueDate: Date!
    complete: Boolean
    # child_id: 
  }

  input ChoreInput{
    description: String!
    payRate: Float!
    dueDate: Date!
    # child_id: 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String): User
    users: [User]
    children: [User]
    # check on that
    chores(username: String): [Chore]
    chore(choreId: ID!): Chore
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addChore(input: ChoreInput ): Chore
    completeChore(choreId: ID!): Chore
    
  }
`;

module.exports = typeDefs;
