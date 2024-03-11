import Navbar from './components/Header/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import FamilyProfile from './pages/FamilyProfile.jsx'
import ChildProfile from './pages/ChildProfile.jsx'

import { Route, Routes } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  // uri: location.href.includes('localhost') ? 'http://localhost:3001/graphql' : 'insert production server uri here',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// console.log(authLink.concat(httpLink))

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {



  return (
    <ApolloProvider client={client}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/child-profile" element={<ChildProfile />} />
          <Route path="/family-profile" element={<FamilyProfile />} />
          
        </Routes> */}
      </main>
    </ApolloProvider>
  );
}

export default App;

