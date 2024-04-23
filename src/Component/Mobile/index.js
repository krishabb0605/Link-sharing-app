import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import mobileDesign from '../../assets/mobileDesign.png';

const Mobile = () => {
  return (
    <Flex h='calc(100vh - 82px)' alignItems='center' justifyContent='center'>
      <Image src={mobileDesign} h='600px' />
    </Flex>
  );
};

export default Mobile;
