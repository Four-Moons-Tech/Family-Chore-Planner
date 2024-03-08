const typeDefs = `
  type User {
    _id: ID
    username: String
    lastName: String
    email: String!
    password: String
    role: String!
    profileImage: String
    children: [User]
    chores: [Chore]
    
  }

  type Chore {
    choreId: ID
    description: String!
    payRate: Float!
    dueDate: String!
    complete: Boolean
    
  }

  input ChoreInput{
    description: String!
    payRate: Float!
    dueDate: String!  
  }

  input UserInput {
    username: String!
    lastName: String!
    email: String!
    password: String!
    profileImage: String
  }
  
  # this updates a user; that's why the _id is the only on that's required
  input UserUpdateInput {
    _id: ID!
    username: String
    lastName: String
    email: String
    password: String
    profileImage: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String): User
    users: [User]
    children:[User]
    chores(username: String ): [Chore]
    chore(choreId: ID!): Chore
  }

  type Mutation {
    addUser(input: UserInput): Auth
    login(email: String!, password: String!): Auth
    addChore(input: ChoreInput ): Chore
    completeChore(choreId: ID!): Chore 
    updateUser(input: UserUpdateInput): User

  }
`;

module.exports = typeDefs;
