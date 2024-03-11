
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
  mutation addUser(
    $username: String!, 
    $email: String!, 
    $password: String!, 
    #Don't forget to make sure your !s match the typedefs
    $lastName: String!
  ) {
    addUser(
      username: $username, 
      email: $email, 
      password: $password, 
      lastName: $lastName
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CHILD = gql`
  mutation addChild($username: String!, $email: String!, $password: String!, $parent_id: ID!) {
    addChild(username: $username, email: $email, password: $password, parent_id: $parent_id) {
      parent {
        username
      }
      child {
        username
      }
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


export const COMPLETE_CHORE = gql`
  mutation completeChore($chore: ID!, $complete: Boolean!) {
    completeChore(choreId: $chore, complete: $complete) {
      _id
      complete
      
    }
  }
`;


export const UPDATE_USER = gql`
  mutation updateUser($input: UserInput) {
    updatedUser(input: $input) {
      _id
      username
      lastName
      email
      password
      role
      profileImage
      
    }
  }
`;


