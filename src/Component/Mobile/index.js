import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import mobileDesign from '../../assets/mobileDesign.png';
import { GlobalContext } from '../../context/global.context';
import { IoArrowForward } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import gray from '../../assets/gray.png';

const Mobile = () => {
  const { allData } = useContext(GlobalContext);
  const location = useLocation();
  const path = location.pathname.includes('preview');

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
                src={allData.profileData ? allData.profileData.image : gray}
                alt='Preview'
                h='70px'
                w='70px'
                borderRadius='50%'
                border={allData.profileData ? '4px solid #7750de' : 'none'}
              />
              {allData.profileData ? (
                <Text fontWeight='700'>
                  {allData.profileData.firstName} {allData.profileData.lastName}
                </Text>
              ) : (
                <Image
                  src={allData.profileData ? allData.profileData.image : gray}
                  alt='Preview'
                  h='10px'
                  w='100px'
                  mt='8px'
                  borderRadius='8px'
                />
              )}
              {allData.profileData ? (
                <Text color='#737373'>{allData.profileData.email}</Text>
              ) : (
                <Image
                  src={allData.profileData ? allData.profileData.image : gray}
                  alt='Preview'
                  h='10px'
                  w='50px'
                  mt='8px'
                  borderRadius='8px'
                />
              )}
            </Flex>

            <Flex mt='24px' gap='12px' flexDir='column'>
              {allData.linkData &&
                allData.linkData.map((item) => (
                  <Button
                    key={item.link}
                    onClick={() => window.open(item.link, '_blank')}
                    width={{ base: 'auto', sm: '220px' }}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    background={
                      item.media.toLowerCase().includes('git')
                        ? 'black'
                        : item.media.toLowerCase().includes('you')
                        ? 'red'
                        : '#3c5ef7'
                    }
                    color='white'
                    variant='solid'
                  >
                    <Flex alignItems='center' gap='8px'>
                      <Icon as={item.icon} />
                      <Text>{item.media}</Text>
                    </Flex>
                    <Icon as={IoArrowForward} />
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
