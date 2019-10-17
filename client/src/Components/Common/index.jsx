import gql from 'graphql-tag';

export const me = gql`
  query me {
    me {
      email
    }
  }
`;

export const sign_In = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      fullName
    }
  }
`;

export const sign_Out = gql`
   mutation {
     signOut {
       message
     }
   }
 `;

export const sign_Up = gql`
  mutation signUp($data: UserCreateInput!) {
    signIn(data: { email: $email, password: $password, fullName: $fullName }) {
      id
      email
      fullName
    }
  }
`;

export const Get_Users = gql`
  {
    users {
      id
    }
  }
`;

// export const Get_User = gql`
//   query users($email: String!) {
//     users(where: { email: $email }) {
//       id
//     }
//   }
// `;

export const Get_Emails = gql`
 {
    users {
      email
    }
  }
`;
