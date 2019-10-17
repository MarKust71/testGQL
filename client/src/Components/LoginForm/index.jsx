import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { me } from '../../App';

const sign_In = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      fullName
    }
  }
`;

const sign_Up = gql`
  mutation signUp($data: UserCreateInput!) {
    signIn(data: { email: $email, password: $password, fullName: $fullName }) {
      id
      email
      fullName
    }
  }
`;

const Get_User = gql`
  {
    users {
      id
    }
  }
`;


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, { data }] = useMutation(sign_In, {
    variables: {
      email,
      password,
    },
    refetchQueries: () => [{ query: me }],
  });

  // const [signUp, { data }] = useMutation(sign_Up, {
  //   variables: {
  //     email,
  //     password,
  //     fullName: "Superadmin"
  //   },
  //   refetchQueries: () => [{ query: me }],
  // });

  const onFormSubmit = e => {
    // console.log(e);
    signIn();
    // signUp();
  };

  const IsKnownEmail = (e) => {
    // const { data, loading, error } = useQuery(Get_User);

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
  
    // console.log(data);
    // return <div>Dziala1</div>;
  }

  return (
    <Segment>
      Logowanie
      {/* {this.state.invalidData && <NegativeMessage header="Błędny email lub hasło" />} */}
      <Form onSubmit={onFormSubmit}>
        <Form.Input
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={e => { IsKnownEmail(e.target.value); setEmail(e.target.value); } }
        />
        <Form.Input
          type="password"
          label="Hasło"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit">Zaloguj!</Button>
      </Form>
    </Segment>
  );
};

export default LoginForm;
