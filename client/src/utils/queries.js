import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      lastName
      email
      children {
        _id
        childUsername
        password
        goal
      }
    }
  }
`;

export const QUERY_CHILD_USER = gql`
  query childUser($childUsername: String!) {
    childUser(childUsername: $childUsername) {
      _id
      childUsername
      password
      goal
      chores {
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
      children {
        _id
        childUsername
        password
        goal
        chores {
          choreId
          description
          dueDate
          complete
          payRate 
        }
      }
    }
  }
`;
