import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
// import Profile from './pages/Profile'
import Preferences from './pages/Preferences'

// SETTING UP THE HTTP LINK
const httpLink = createHttpLink({
  uri: '/graphql',
});

// SETTING UP THE CONTEXT
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// CREATING THE APOLLO CLIENT WITH THE HTTPLINK AND CONTEXT
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
<ApolloProvider client={client}>
      <Router>
        <>
          {/* Header? */}
          <Routes>
            <Route
              exact path='/'
              element={<Preferences />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
