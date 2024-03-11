
import React from 'react';
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // consistency with a navbar
  const backgroundColor = 'gray.100'; 

  return (
    <Box
      as="footer"
      w="full"
      mt="auto"
      bg={backgroundColor}
      p={2} 
      textAlign="center"
    >
      {location.pathname !== '/' && (
        <Button colorScheme="blue" mb={2} size="sm" onClick={() => navigate(-1)}>
          &larr; Go Back
        </Button>
      )}
      <h4 style={{ fontSize: '1em', fontWeight: 'normal', color: '#333' }}>
        Made with{' '}
        <span
          className="emoji"
          role="img"
          aria-label="heart"
          aria-hidden="false"
        >
          ❤️
        </span>{' '}
        by Anna Moon, Anna Chuapetcharasopon, Brian Chia, Maryna Serdeshna
      </h4>
    </Box>
  );
};

export default Footer;
