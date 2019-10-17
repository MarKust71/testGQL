import React, { useState } from 'react';
import { Button, Form, Segment, Label } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { me, sign_In, Get_Emails } from '../Common'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);

  const { data, loading, error } = useQuery(Get_Emails);
  if (loading) console.log('LF->', 'Loading...');
  if (error) console.log('LF.error->', error.message);

  const isKnownEmail = (e) => { 
    setEmail(e.target.value); 
    let test = data.users.map( (el) => { return el.email; } ).filter( (el) => { return el === e.target.value; } ).length;
    // console.log(e.target.value, test);
    if (test) {setSignin(true); setSignup(false)} else {setSignin(false); setSignup(true)}
  }

  // const [signIn, { data }] = useMutation(sign_In, {
  const [signIn] = useMutation(sign_In, {
    variables: {
      email,
      password,
    },
    refetchQueries: () => [{ query: me }],
  });

  const onFormSubmit = e => {
    // isKnownEmail(email);
    signIn();
  };

  return (
    <Segment>
      {(signin && !signup) && (<Label>Logowanie</Label>)}
      {(!signin && signup) && (<Label>Rejestracja</Label>)}
      {(!signin && !signup) && (<Label>Logowanie / Rejestracja</Label>)}
      <Form onSubmit={onFormSubmit}>
        <Form.Input
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={e => { isKnownEmail(e); } }
        />
        {(signin || signup) && (
          <Form.Input
          type="password"
          label="Hasło"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        )}
        {(!signin && signup) && (
          <Form.Input
          type="password"
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
          value={repassword}
          onChange={e => setRepassword(e.target.value)}
          />
        )}
        {true && (<Button type="submit">Sprawdź</Button>) }
        
      </Form>
    </Segment>
  );
};

export default LoginForm;
