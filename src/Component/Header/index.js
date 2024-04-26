import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Tab,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CiLink } from 'react-icons/ci';
import { FaLink } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineEye } from 'react-icons/ai';

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Mobile from '../Mobile';

const Header = () => {
  const location = useLocation();
  const path = location.pathname.includes('preview');
  const toast = useToast();

  let defaultTabIndex = 0;
  if (location.pathname.includes('profile')) {
    defaultTabIndex = 1;
  } else if (location.pathname === '/') {
    defaultTabIndex = 0;
  }

  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  useEffect(() => {
    if (location.pathname.includes('profile')) {
      return setTabIndex(1);
    }

    return setTabIndex(0);
  }, [location]);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const linksData = JSON.parse(localStorage.getItem('linksData'));
        if (linksData.length) {
          const shareText = (linksData || [])
            .map((link) => `${link.media}: ${link.link}`)
            .join('\n');

          await navigator.share({
            title: 'My Social Media Links',
            text: shareText,
          });
        } else {
          toast({
            description: 'Link is not available !',
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          description: 'Error while sharing !',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: 'Web Share API not supported !',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        flexDir='column'
        h='100vh'
        width='100vw'
        pos='relative'
        p={path ? '0px' : '24px 44px'}
      >
        {path ? (
          <Box
            backgroundColor='#7750de'
            p='16px 16px 0 16px'
            h='50vh'
            borderBottomLeftRadius='40px'
            borderBottomRightRadius='40px'
          >
            <Flex
              alignItems='center'
              justifyContent='space-between'
              bg='white'
              p='8px'
              borderRadius='8px'
            >
              <NavLink to='/'>
                <Button border='1px solid #7750de' color='#7750de'>
                  Back to Editor
                </Button>
              </NavLink>
              <NavLink to='/'>
                <Button
                  border='1px solid #7750de'
                  color='white'
                  bg='#7750de'
                  _hover={{ color: 'white' }}
                  onClick={handleShare}
                >
                  Share Link
                </Button>
              </NavLink>
            </Flex>
          </Box>
        ) : (
          <Flex
            alignItems='center'
            justifyContent='space-between'
            bg='white'
            p='8px'
            fontSize='20px'
          >
            <Flex alignItems='center' gap='8px'>
              <Icon as={CiLink} bg='#6511f6' color='white' borderRadius='4px' />
              <Text
                lineHeight='normal'
                fontWeight='700'
                display={{ base: 'none', sm: 'block' }}
              >
                devlinks
              </Text>
            </Flex>
            <Tabs onChange={handleTabsChange} index={tabIndex}>
              <Flex gap='8px' color='#737373'>
                <NavLink to='/'>
                  <Tab
                    _selected={{
                      bg: '#efe9fe',
                      color: '#7750de',
                      borderRadius: '6px',
                    }}
                  >
                    <Flex alignItems='center' gap='8px' p='4px'>
                      <Icon as={FaLink} />
                      <Text
                        lineHeight='normal'
                        display={{ base: 'none', sm: 'block' }}
                        fontWeight='700'
                      >
                        Links
                      </Text>
                    </Flex>
                  </Tab>
                </NavLink>

                <NavLink to='/profile'>
                  <Tab
                    _selected={{
                      bg: '#efe9fe',
                      color: '#7750de',
                      borderRadius: '6px',
                    }}
                  >
                    <Flex alignItems='center' gap='8px' p='4px'>
                      <Icon as={CgProfile} />
                      <Text
                        lineHeight='normal'
                        display={{ base: 'none', sm: 'block' }}
                        fontWeight='700'
                      >
                        Profile Details
                      </Text>
                    </Flex>
                  </Tab>
                </NavLink>
              </Flex>
            </Tabs>

            <Box>
              <NavLink to='/preview'>
                <Button border='1px solid #7750de' color='#7750de'>
                  <Icon
                    as={AiOutlineEye}
                    display={{ base: 'block', sm: 'none' }}
                  />
                  <Text display={{ base: 'none', sm: 'block' }}>Preview</Text>
                </Button>
              </NavLink>
            </Box>
          </Flex>
        )}

        {path ? (
          <Grid
            templateColumns='repeat(10, 1fr)'
            alignItems='center'
            h='100%'
            pos={path ? 'absolute' : 'relative'}
            left='50%'
            top='50%'
            transform=' translate(-50%, -50%)'
          >
            <GridItem colSpan='10'>
              <Flex alignItems='center' justifyContent='center'>
                <Mobile />
              </Flex>
            </GridItem>
          </Grid>
        ) : (
          <Grid templateColumns='repeat(10, 1fr)' alignItems='center' h='100%'>
            <GridItem
              colSpan={{ base: 0, lg: 4 }}
              display={{ base: 'none', lg: 'block' }}
            >
              <Flex alignItems='center' justifyContent='center'>
                <Mobile />
              </Flex>
            </GridItem>

            <GridItem colSpan={{ base: 10, lg: 6 }}>
              <Flex>
                <Outlet />
              </Flex>
            </GridItem>
          </Grid>
        )}
      </Flex>
    </>
  );
};

export default Header;
