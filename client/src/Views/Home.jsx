import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { me } from '../App';

const Get_User = gql`
  {
    users {
      id
    }
  }
`;

const sign_Out = gql`
   mutation {
     signOut {
       message
     }
   }
 `;

const Home = () => {

  const { data, loading, error } = useQuery(Get_User);

  const [signOut] = useMutation(sign_Out, { refetchQueries: () => [{ query: me}] });

  console.log(signOut);

  const onButtonClick = (e) => {
    console.log('Klikłeś wyloguj', e);
    signOut();
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log('Komponent Home->', data);
  return (
    <Segment>
      Dziala1
      <Button onClick={ (e) => onButtonClick(e) }>Wyloguj!</Button>
    </Segment>
  );
};

export default Home;
