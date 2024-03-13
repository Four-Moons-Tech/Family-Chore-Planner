const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    lastName: String
    email: String!
    password: String
    role: String!
    profileImage: String
    age: String
    children: [User]
    chores: [Chore]
    goal: Float
    totalEarnings: Float
  }

  type Chore {
    choreId: ID
    description: String
    payRate: Int
    dueDate: String
    complete: Boolean
    userId: ID
    
  }

  input ChoreInput{
    description: String!
    payRate: Int!
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

  input ChoreUpdateInput {
    choreId: ID!
    description: String!
    payRate: Int!
    dueDate: String! 
    userId: ID 

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
    addChild(username: String!, email: String!, password: String!, parent_id: ID!, age: String): ParentAndChild
    login(email: String!, password: String!): Auth
    addChore(input: ChoreInput ): User
    completeChore(choreId: ID!, userId: ID!): Chore 
    updateUser(input: UserUpdateInput): User
    deleteChore(userId: ID!, choreId:ID!):User
    updateChore(input: ChoreUpdateInput ):User
  }
`;

module.exports = typeDefs;
