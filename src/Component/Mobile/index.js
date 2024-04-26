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
import gray from '../../assets/gray.png';
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
      <Box pos='absolute'>
        {allData && (
          <Flex alignItems='center' flexDir='column'>
            <Flex alignItems='center' flexDir='column'>
              <Image
                src={
                  allData.profileData.image ? allData.profileData.image : gray
                }
                alt='Preview'
                h='70px'
                w='70px'
                borderRadius='50%'
                border={
                  allData.profileData.image ? '4px solid #7750de' : 'none'
                }
              />

              {allData.profileData.firstName ? (
                <Tooltip
                  label={
                    allData.profileData
                      ? allData.profileData.firstName +
                        ' ' +
                        allData.profileData.lastName
                      : ''
                  }
                  placement='right'
                >
                  <Text
                    fontWeight='700'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={{ base: '140px', lg: '238px' }}
                    textAlign='center'
                  >
                    {allData.profileData.firstName}{' '}
                    {allData.profileData.lastName}
                  </Text>
                </Tooltip>
              ) : (
                <Image
                  src={gray}
                  alt='Preview'
                  h='16px'
                  w='100px'
                  mt='8px'
                  borderRadius='8px'
                />
              )}

              {allData.profileData.email ? (
                <Tooltip
                  label={allData.profileData ? allData.profileData.email : ''}
                  placement='right'
                >
                  <Text
                    color='#737373'
                    width={{ base: '140px', lg: '238px' }}
                    textAlign='center'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                  >
                    {allData.profileData.email}
                  </Text>
                </Tooltip>
              ) : (
                <Image
                  src={gray}
                  alt='Preview'
                  h='16px'
                  w='50px'
                  mt='8px'
                  borderRadius='8px'
                />
              )}
            </Flex>

            <Flex mt='24px' gap='12px' flexDir='column'>
              {newAllLinkData.map((item, index) => (
                <Button
                  key={index}
                  padding={{ base: '0px 4px', sm: '0px 16px' }}
                  onClick={() =>
                    window.open(item.link ? item.link : '', '_blank')
                  }
                  width={{ base: '124px', sm: '220px' }}
                  background={
                    item.media
                      ? item.media.toLowerCase().includes('git')
                        ? 'black'
                        : item.media.toLowerCase().includes('you')
                        ? 'red'
                        : item.media.toLowerCase().includes('telegram')
                        ? '#24A1DE'
                        : '#3c5ef7'
                      : '#eeeeee'
                  }
                  _hover={{
                    backgroundColor: item.media ? '#000000a1' : '#eeeeee',
                  }}
                  h={{ base: '24px', md: '40px' }}
                  color='white'
                  variant='solid'
                >
                  {item.media && (
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      width='100%'
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
