import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import mobileDesign from '../../assets/mobileDesign.png';
import { GlobalContext } from '../../context/global.context';
import { IoArrowForward } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';

const Mobile = () => {
  const { allData } = useContext(GlobalContext);
  const location = useLocation();
  const path = location.pathname.includes('preview');

  let newAllLinkData = Array(4).fill('');
  allData.linkData &&
    allData.linkData.forEach((item, index) => {
      newAllLinkData.splice(index, 1, item);
    });

  return (
    <Flex
      h={path ? 'auto' : 'calc(100vh - 82px)'}
      alignItems='center'
      justifyContent='center'
      pos='relative'
    >
      <Image src={mobileDesign} h={{ base: 'auto', sm: '600px' }} />
      <Box pos='absolute' width='75%'>
        {allData && (
          <Flex alignItems='center' flexDir='column'>
            {allData.profileData.firstName ? (
              <Flex alignItems='center' flexDir='column'>
                <Image
                  src={allData.profileData.image}
                  alt='Preview'
                  h='70px'
                  w='70px'
                  borderRadius='50%'
                  border='4px solid'
                  borderColor='linkSharing.purple.bg'
                />

                <Tooltip
                  label={
                    allData.profileData.firstName +
                    ' ' +
                    allData.profileData.lastName
                  }
                  placement='right'
                >
                  <Text
                    fontWeight='700'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={{ base: '140px', md: '238px' }}
                    textAlign='center'
                  >
                    {allData.profileData.firstName}{' '}
                    {allData.profileData.lastName}
                  </Text>
                </Tooltip>

                <Tooltip label={allData.profileData.email} placement='right'>
                  <Text
                    color='linkSharing.textColor'
                    width={{ base: '140px', md: '238px' }}
                    textAlign='center'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                  >
                    {allData.profileData.email}
                  </Text>
                </Tooltip>
              </Flex>
            ) : (
              <Flex alignItems='center' flexDir='column'>
                <Box
                  backgroundColor='linkSharing.gray.light'
                  alt='Preview'
                  h='70px'
                  w='70px'
                  borderRadius='50%'
                />

                <Box
                  backgroundColor='linkSharing.gray.light'
                  alt='Preview'
                  h='16px'
                  w='100px'
                  mt='8px'
                  borderRadius='8px'
                />

                <Box
                  backgroundColor='linkSharing.gray.light'
                  alt='Preview'
                  h='16px'
                  w='50px'
                  mt='8px'
                  borderRadius='8px'
                />
              </Flex>
            )}

            <Flex mt='24px' gap='12px' flexDir='column' width='100%'>
              {newAllLinkData.map((item, index) => (
                <Button
                  key={index}
                  padding={{ base: '0px 4px', sm: '0px 16px' }}
                  onClick={() =>
                    window.open(item.link ? item.link : '', '_blank')
                  }
                  width='100%'
                  background={
                    item.media
                      ? item.media.toLowerCase().includes('git')
                        ? 'black'
                        : item.media.toLowerCase().includes('you')
                        ? 'red'
                        : item.media.toLowerCase().includes('telegram')
                        ? 'linkSharing.telegram'
                        : 'linkSharing.linkedIn'
                      : 'linkSharing.gray.light'
                  }
                  _hover={{ opacity: '0.6' }}
                  h={{ base: '24px', md: '40px' }}
                  color='white'
                  variant='solid'
                >
                  {item.media && (
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      width='100%'
                      fontSize={{ base: '14px', sm: '16px' }}
                    >
                      <Flex alignItems='center' gap='8px'>
                        <Icon
                          as={
                            item.icon.toLowerCase().includes('git')
                              ? FaGithub
                              : item.icon.toLowerCase().includes('you')
                              ? FaYoutube
                              : item.icon.toLowerCase().includes('telegram')
                              ? FaTelegram
                              : FaLinkedin
                          }
                        />
                        <Text>{item.media}</Text>
                      </Flex>
                      <Icon as={IoArrowForward} />
                    </Flex>
                  )}
                </Button>
              ))}
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Mobile;
