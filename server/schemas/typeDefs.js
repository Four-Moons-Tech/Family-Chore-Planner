const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    lastName: String
    email: String!
    password: String
    role: String!
    profileImage: String
    children: [ID]
    chores: [Chore]
    
  }

  type Chore {
    choreId: ID
    description: String!
    payRate: Int!
    dueDate: String!
    complete: Boolean
    userId: ID
    
  }

  input ChoreInput{
    description: String!
    payRate: Float!
    dueDate: String! 
    userId: ID 
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
    user(username: String!): User
    users: [User]
    children:[User]
    chores(userId: ID ): [Chore]
    chore(choreId: ID!): Chore
  }

  type ParentAndChild {
    parent: User
    child: User
  }

  type UserWithChores {
    chore: Chore
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, lastName: String!): Auth
    addChild(username: String!, email: String!, password: String!, parent_id: ID!): ParentAndChild
    login(email: String!, password: String!): Auth
    addChore(input: ChoreInput ): User
    completeChore(choreId: ID!): Chore 
    updateUser(input: UserUpdateInput): User

  }
`;

module.exports = typeDefs;
