import { Box, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { CiLink } from 'react-icons/ci';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Mobile from '../Mobile';

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);
  const path = location.pathname.includes('preview');
  console.log(path);
  return (
    <>
      <Flex flexDir='column' h='100vh' w='100vw'>
        {path ? (
          <Flex alignItems='center' justifyContent='space-between'>
            <NavLink to='/'>Back to Editor</NavLink>
            <NavLink to='/'>Share Link Editor</NavLink>
          </Flex>
        ) : (
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Icon as={CiLink} />
              <Text>devlinks</Text>
            </Flex>
            <Box>
              <NavLink to='/'>Links</NavLink>
              <NavLink to='/profile'>ProfileDetails</NavLink>
            </Box>
            <Box>
              <NavLink to='/preview'>Preview</NavLink>
            </Box>
          </Flex>
        )}

        <Grid templateColumns='repeat(10, 1fr)' alignItems='center' h='100%'>
          <GridItem colSpan={path ? 10 : 4}>
            <Flex alignItems='center' justifyContent='center'>
              <Mobile />
            </Flex>
          </GridItem>
          <GridItem colSpan={path ? 0 : 6} display={path ? 'none' : 'block'}>
            <Flex alignItems='center' justifyContent='center'>
              <Outlet />
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Header;
