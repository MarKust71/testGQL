import React, { useState } from 'react';
import { Button, Form, Segment, Label } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { me, sign_In, sign_Up, Get_Emails } from '../Common'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);

  const { data, loading, error } = useQuery(Get_Emails);
  if (loading) console.log('LF->', 'Się ładuje...');
  if (error) console.log('LF.error->', error.message);

  const isKnownEmail = (e) => { 
    setEmail(e.target.value); 
    let test = data.users.map( (el) => { return el.email; } ).filter( (el) => { return el === e.target.value; } ).length;
    if (test) {setSignin(true); setSignup(false)} else {setSignin(false); setSignup(true)}
  }

  const [signIn] = useMutation(sign_In, {
    variables: {
      email,
      password,
    },
    refetchQueries: () => [{ query: me }],
  });

  const [signUp] = useMutation(sign_Up, {
    variables: {
      email,
      password,
      fullName: fullname
    },
    refetchQueries: () => [{ query: me }],
  });

  const onFormSubmit = e => {
    if (signin && !signup) {
      signIn().catch( e => {
        if (e.networkError) {
          console.log('signin.e->', e.networkError.result.errors)
        } else {
          console.log('signin.e->', e)
        }
      } );
    }
    if (!signin && signup) {
      if (password === repassword) {
        signUp()
          .then( res => { signIn(); } )
          .catch( e => {
            if (e.networkError) {
              console.log('signup.e->', e.networkError.result.errors)
            } else {
              console.log('signup.e->', e)
            }
          } 
        );
      } else {
        console.log("hasło nie jest identyczne");
      }
    }
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
          <>
            <Form.Input
            type="password"
            label="Powtórz hasło"
            placeholder="Powtórz hasło"
            value={repassword}
            onChange={e => setRepassword(e.target.value)}
            />
            <Form.Input
            label="Nick"
            placeholder="Nick"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            />
          </>
        )}
        {(signin && !signup) && (<Button type="submit">Zaloguj</Button>)}
        {(!signin && signup) && (<Button type="submit">Zarejestruj</Button>)}
        {(!signin && !signup) && (<Button type="submit">Sprawdź</Button>) }
      </Form>
    </Segment>
  );
};

export default LoginForm;
