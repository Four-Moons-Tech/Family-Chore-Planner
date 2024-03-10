// import Header from '../components/Header';
// // // import Content from '../components/Content';
import Footer from '../components/Footer';

// export default function Home() {
//   return (
//     <div>Home</div>

//   )
// }
import React from 'react';
import { Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* <Box display="flex" justifyContent="center">
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/login"style={{ marginRight: '1rem' }}>Log in</Link>
        <Link to="/signup"style={{ marginRight: '1rem' }}>Sign up</Link>
        <Link to="/child-profile">My profile</Link>
      </Box> */}

      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* Your hero image */}
        <img src="/images/iStock-1398315874.jpg" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Your content */}
      <div>
        {/* Add your content here */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;