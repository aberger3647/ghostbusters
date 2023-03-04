import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

// import Profile from './pages/Profile'
import Explore from './pages/Explore'
import CreateProfile from './pages/CreateProfile'
import Preferences from './pages/Preferences'
import Login from './pages/LoginForm'
import SignUp from './pages/SignUpForm'
import Footer from './components/Footer'
import ProfileForm from './pages/CreateProfile'
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
  // add hook to keep track of login/logout
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('id_token'));
  // handle login
  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };
  // handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem('id_token');
  //   setLoggedIn(false);
  // };

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* Header? */}
          <Routes>

            {/* if not logged in, direct to login */}
            {/* {!loggedIn && ( */}
            <Route
              exact path='/'
              element={<SignUp />}
            />
            {/* )} */}

            {/* if logged in, direct to explore pg */}
            {/* {loggedIn && ( */}
            <Route
              exact path='/explore'
              element={<Explore />}
            />
            {/* )} */}

            <Route path='/preferences' element={<Preferences />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/createprofile' element={<ProfileForm />} />
            <Route path='/details' element={<Details />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/matches' element={<Matches />} />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
