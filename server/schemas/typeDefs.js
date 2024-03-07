const typeDefs = `
  type User {
    _id: ID
    username: String
    lastName: String
    email: String
    password: String
    children: [ChildUser]
    
  }

  type ChildUser {
    _id: ID
    childUsername: String
    password: String
    chores: [Chore]
    
  }

  type Chore {
    choreId: ID
    description: String!
    payRate: Float!
    dueDate: String!
    complete: Boolean
    # child_id: 
  }

  input ChoreInput{
    description: String!
    payRate: Float!
    dueDate: String!
    # child_id: 
  }

  input UserInput {
    username: String!
    lastName: String!
    email: String!
    password: String!
  }

   input ChildUserInput {
    childUsername: String!
    password: String! 
  }

  type UserAuth {
    token: ID!
    user: User
  }

  type ChildAuth {
    token: ID!
    user: ChildUser
  }
  

  type Query {
    me: User
    user(username: String): User
    users: [User]
    childUser (childUsername: String): ChildUser
    childUsers: [ChildUser]
    children (username: String) :[ChildUser]
    chores(childUsername: String): [Chore]
    chore(choreId: ID!): Chore
  }

  type Mutation {
    addUser(input: UserInput): UserAuth
    addChildUser(input: ChildUserInput): ChildAuth
    userLogin(email: String!, password: String!): UserAuth
    childUserLogin(username: String!,password: String! ): ChildAuth
    addChore(input: ChoreInput ): Chore
    completeChore(choreId: ID!): Chore
 
    
  }
`;

module.exports = typeDefs;
