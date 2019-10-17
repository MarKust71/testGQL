import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { me, Get_Users, sign_Out } from '../Components/Common'

const Home = () => {

// console.log('Get_Users->', Get_Users);
  const { data, loading, error } = useQuery(Get_Users);
// if (data) console.log('Komponent Home->', data.users);

  const [signOut] = useMutation(sign_Out, { refetchQueries: () => [{ query: me}] });

  const onButtonClick = (e) => {
    signOut();
  };

  if (loading) return 'Loading...';
  if (error) return `Błąd! ${error.message}`;

  return (
    <Segment>
      <p>Tośmy w domu</p>
      <Button onClick={ (e) => onButtonClick(e) }>Wyloguj!</Button>
    </Segment>
  );
};

export default Home;
