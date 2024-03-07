

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const COMPLETE_CHORE = gql`
  mutation completeChore($chore: ID!, $complete: Boolean!) {
    completeChore(choreId: $chore, complete: $complete) {
      _id
      complete
      
    }
  }
`;

export const ADD_CHORE = gql`
  mutation addChore($description: String!,$payRate:Number, $dueDate: Date, $child_id: ID ){
    addChore(description: $description, payRate: $payRate, dueDate: $dueDate, childId:$child_id ){
      choreId
      description
      payRate
      dueDate
      
    }
  }
`;