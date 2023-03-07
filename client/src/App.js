import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

// import Profile from './pages/Profile'
import Explore from './pages/Explore'
import Login from './pages/LoginForm'
import SignUp from './pages/SignUpForm'
import Footer from './components/Footer'
import ProfileForm from './pages/CreateProfile'
import PreferencesForm from './pages/Preferences';
import Details from './pages/Details'
import Profile from './pages/Profile'
import Matches from './pages/Matches'

import Upload from './components/Upload'

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
          <Routes>
            <Route
              exact path='/'
              element={<Login />}
            />
            <Route
              exact path='/explore'
              element={<Explore />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/createprofile' element={<ProfileForm />} />
            <Route path='/preferences' element={<PreferencesForm />} />
            <Route path='/details/:userId' element={<Details />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/matches' element={<Matches />} />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
