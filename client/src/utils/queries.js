import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      lastName
      email
      role
      totalEarnings
      goal
      age
      children {
        _id
        goal
        password
        age
      }
      chores {
        userId
        choreId
        description
        dueDate
        complete
        payRate
      }
    }
  }
`;

export const QUERY_ALL_USER = gql`
  query users{
    users {
      _id
      username
      lastName
      email
      role
      totalEarnings
      age
      children {
        _id
        age
        goal
        password
      }
      chores {
        userId
        choreId
        description
        dueDate
        complete
        payRate
      }
    }
  }
`;

export const QUERY_CHORES = gql`
  query chores {
    chores {
        userId
        choreId
        description
        dueDate
        complete
        payRate
    }
  }
`;


export const QUERY_SINGLE_CHORE = gql`
  query chore($choreId: ID!) {
    chore(choreId: $choreId) {
        userId
        choreId
        description
        dueDate
        complete
        payRate 
      }
    }
  
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      lastName
      email
      role
      children {
        _id
        username
        password
        role
        goal
        
      }
    }
  }
`;

