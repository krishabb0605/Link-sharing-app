import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import mobileDesign from '../../assets/mobileDesign.png';
import { GlobalContext } from '../../context/global.context';
import { IoArrowForward } from 'react-icons/io5';

const Mobile = () => {
  const { allData } = useContext(GlobalContext);

  return (
    <Flex
      h='calc(100vh - 82px)'
      alignItems='center'
      justifyContent='center'
      pos='relative'
    >
      <Image src={mobileDesign} h='600px' />
      <Box pos='absolute'>
        {allData && (
          <Flex alignItems='center' flexDir='column'>
            {allData.profileData && (
              <Flex alignItems='center' flexDir='column'>
                <Image
                  src={allData.profileData.image}
                  alt='Preview'
                  h='70px'
                  w='70px'
                  borderRadius='50%'
                />
                <Text fontWeight='700'>
                  {allData.profileData.firstName} {allData.profileData.lastName}
                </Text>
                <Text color='#737373'>{allData.profileData.email}</Text>
              </Flex>
            )}

            <Flex my='24px' gap='12px' flexDir='column'>
              {allData.linkData && allData.linkData.map((item) => (
                <Button
                  key={item.link}
                  onClick={() => window.open(item.link, '_blank')}
                  width='220px'
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
