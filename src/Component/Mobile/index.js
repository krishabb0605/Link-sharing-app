import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import mobileDesign from '../../assets/mobileDesign.png';
import { GlobalContext } from '../../context/global.context';

const Mobile = () => {
  const { allData } = useContext(GlobalContext);
  return (
    <Flex h='calc(100vh - 82px)' alignItems='center' justifyContent='center' pos='relative'>
      <Image src={mobileDesign} h='600px' />
      <Box pos='absolute'>
        {allData && (
          <Flex alignItems='center' flexDir='column'>
            {allData.data.image && (
              <Image
                src={allData.data.image}
                alt='Preview'
                style={{ maxWidth: '70px', maxHeight: '70px' }}
                borderRadius='50%'
              />
            )}
            <Text>{allData.data.firstName}</Text>
            <Text>{allData.data.lastName}</Text>
            <Text>{allData.data.email}</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Mobile;
