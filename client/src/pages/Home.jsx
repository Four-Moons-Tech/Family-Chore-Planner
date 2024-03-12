// import Header from '../components/Header';
// // // import Content from '../components/Content';
import Footer from '../components/Footer';

// export default function Home() {
//   return (
//     <div>Home</div>

//   )
// }
import React from 'react';
import { Box, Image, useMediaQuery, useColorModeValue } from "@chakra-ui/react";
import {motion, useAnimation } from "framer-motion";
import { Link } from 'react-router-dom';

const Home = () => {

  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const controls = useAnimation();

  const popUpVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
  };

  React.useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  const textColor = useColorModeValue("blue.800", "blue.300");

  return (
    <div>
      <Box 
        position='relative'
        width='100%'
        height={isMobile ? "50vh" : "100vh"}
        overflow='hidden'
        >
        {/* Your hero image */}
        <Image src="/images/iStock-1398315874.jpg" alt="Hero"  objectFit= 'cover' w="100%" h="100%"/>
        <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        >
        <motion.div
            initial="hidden"
            animate={controls}
            variants={popUpVariants}
           style={{
            transform:"translate(-50%, -50%)",
            fontWeight:"bold",
            fontSize: "clamp(2rem, 5vw, 5rem)",
            color: "blue.800",
            opacity: 1,
            textAlign:"center"
           }}
          >
            Family Chore Planner
          </motion.div>
        </Box>
      </Box>
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