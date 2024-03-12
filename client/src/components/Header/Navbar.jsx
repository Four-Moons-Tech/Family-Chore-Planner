import React from 'react';
import { Box, Breadcrumb, BreadcrumbItem, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const AppNavbar = () => {
  const user = Auth.getProfile()?.data
  console.log(user)
  return (


    <>

      <Flex justifyContent="center" fontSize="lg" fontWeight="bold" padding="1rem" backgroundColor="gray.100" boxShadow="md">
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <Box
              as={Link}
              to="/"
              _hover={{ color: "blue.500" }}
              style={{ color: 'gray.600', textDecoration: 'none' }}
            >
              Home
            </Box>
          </BreadcrumbItem>

          {Auth.loggedIn() ? (
            <>
              <BreadcrumbItem>
                <Box
                  as={Link}
                  to="/"
                  onClick={Auth.logout}
                  _hover={{ color: "blue.500" }}
                  style={{ color: 'gray.600', textDecoration: 'none' }}
                >
                  Sign out
                </Box>
              </BreadcrumbItem>
              <ChevronRightIcon color='gray.500' />
              <BreadcrumbItem>
                <Box
                  as={Link}
                  to="/family-profile"
                  _hover={{ color: "blue.500" }}
                  style={{ color: 'gray.600', textDecoration: 'none' }}
                >
                  Family Profile
                </Box>
              </BreadcrumbItem>
              <ChevronRightIcon color='gray.500' />
              <BreadcrumbItem>
                <Box
                  as={Link}
                  to="/child-profile"
                  _hover={{ color: "blue.500" }}
                  style={{ color: 'gray.600', textDecoration: 'none' }}
                >
                  Child Profile
                </Box>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <Box
                  as={Link}
                  to="/login"
                  _hover={{ color: "blue.500" }}
                  style={{ color: 'gray.600', textDecoration: 'none' }}
                >
                  Log in
                </Box>
              </BreadcrumbItem>
              <ChevronRightIcon color='gray.500' />

              <BreadcrumbItem>
                <Box
                  as={Link}
                  to="/signup"
                  _hover={{ color: "blue.500" }}
                  style={{ color: 'gray.600', textDecoration: 'none' }}
                >
                  Sign up
                </Box>
              </BreadcrumbItem>
              <ChevronRightIcon color='gray.500' />
            </>
          )}

        </Breadcrumb>
      </Flex>


    </>

  );
};

export default AppNavbar;