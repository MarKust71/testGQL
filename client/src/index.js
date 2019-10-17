import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import apollo from './apollo';

ReactDOM.render(
  <ApolloProvider client={apollo}>
    <BrowserRouter>
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
