import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Breadcrumb, BreadcrumbItem, Box } from "@chakra-ui/react";
import { ChevronRightIcon} from "@chakra-ui/icons"
import { IoChevronForwardCircleOutline } from 'react-icons/io5';


// import { Navbar, Nav, Container, Modal, Tab } from '@chakra-ui/react';
// import SignUpForm from '../SignupForm';
// import LoginForm from '../LoginForm';

// import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <Flex justifyContent="center" fontSize="lg" fontWeight="bold" padding="1rem" backgroundColor="gray.100" boxShadow="md">
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
        <Box
          as ={Link}to="/"
          _hover={{ color: "blue.500" }}
          style={{ marginRight: '1rem', color: 'gray.600', textDecoration: 'none' }}>
            Home
            </Box>
        </BreadcrumbItem>

        <BreadcrumbItem>
        <Box
        as ={Link} to ="/login"
        _hover={{ color: "blue.500" }}
        style={{ marginRight: '1rem', color: 'gray.600', textDecoration: 'none' }}>
          Log in
          </Box>
        </BreadcrumbItem>

        <BreadcrumbItem>
        <Box
        as ={Link} to="/signup"
        _hover={{ color: "blue.500" }}
         style={{ marginRight: '1rem', color: 'gray.600', textDecoration: 'none' }}>
          Sign up
          </Box>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Box
          as ={Link} to="/child-profile"
          _hover={{ color: "blue.500" }}
           style={{ color: 'gray.600', textDecoration: 'none' }}>
            My profile
            </Box>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>



    // <>
    /* //   <Navbar bg='dark' variant='dark' expand='lg'>
    //     <Container fluid>
    //       <Navbar.Brand as={Link} to='/'>
    //         Google Books Search
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls='navbar' />
    //       <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
    //         <Nav className='ml-auto d-flex'>
    //           <Nav.Link as={Link} to='/'>
    //             Search For Books */
    //           </Nav.Link>
    //           {/* if user is logged in show saved books and logout */}
    //           {Auth.loggedIn() ? (
    //             <>
    //               <Nav.Link as={Link} to='/saved'>
    //                 See Your Books
    //               </Nav.Link>
    //               <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
    //             </>
    //           ) : (
    //             <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
    //           )}
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   {/* set modal data up */}
    //   <Modal
    //     size='lg'
    //     show={showModal}
    //     onHide={() => setShowModal(false)}
    //     aria-labelledby='signup-modal'>
    //     {/* tab container to do either signup or login component */}
    //     <Tab.Container defaultActiveKey='login'>
    //       <Modal.Header closeButton>
    //         <Modal.Title id='signup-modal'>
    //           <Nav variant='pills'>
    //             <Nav.Item>
    //               <Nav.Link eventKey='login'>Login</Nav.Link>
    //             </Nav.Item>
    //             <Nav.Item>
    //               <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
    //             </Nav.Item>
    //           </Nav>
    //         </Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <Tab.Content>
    //           <Tab.Pane eventKey='login'>
    //             <LoginForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //           <Tab.Pane eventKey='signup'>
    //             <SignUpForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //         </Tab.Content>
    //       </Modal.Body>
    //     </Tab.Container>
    //   </Modal>
    // </>
  );
};

export default AppNavbar;