
import React from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <Box textAlign="center" mb="5">
        {location.pathname !== '/' && (
          <Button colorScheme="black" mb="3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </Button>
        )}
        <h4 style={{ fontSize: '1.2em' }}> {/* Increasing font size */}
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
    </footer>
  );
};

export default Footer;
