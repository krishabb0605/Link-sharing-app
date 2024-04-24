import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/global.context';
import { useToast } from '@chakra-ui/react';

const Profile = () => {
  const [allProfileData, setAllProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAllProfileData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { handleAllData } = useContext(GlobalContext);

  const handleSave = () => {
    if (
      allProfileData.firstName !== '' &&
      allProfileData.lastName !== '' &&
      allProfileData.email !== '' &&
      allProfileData.image !== ''
    ) {
      toast({
        description: 'Your changes have been successfully saved !',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      handleAllData(allProfileData);
      setAllProfileData({
        firstName: '',
        lastName: '',
        email: '',
        image: '',
      });
    } else {
      toast({
        description: 'Fill All Details.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Box color='#737373' width={{ base: '100%', xl: '80%' }}>
      <Box
        height={{
          base: 'calc(100vh - 200px)',
          sm: 'calc(100vh - 300px)',
        }}
      >
        <Box>
          <Text fontWeight='700' fontSize='30px' color='black'>
            Profile Details
          </Text>
          <Text>
            Add your details to create a personal touch to your profile.
          </Text>
        </Box>
        <Flex flexDir='column' mt='44px' gap='30px'>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'start', lg: 'center' }}
            gap={{ sm: '12px', lg: '0px' }}
          >
            <Text minW='200px'>Profile picture</Text>
            <input
              type='file'
              accept=' image/jpeg, image/png'
              name='image'
              id='file'
              onChange={handleImageChange}
            />
          </Flex>

          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'start', lg: 'center' }}
            gap={{ sm: '12px', lg: '0px' }}
          >
            <Text minW='200px'>First name</Text>
            <Input
              type='text'
              borderColor='#d0d5dd'
              placeholder='Enter first name'
              value={allProfileData.firstName}
              onChange={(e) =>
                setAllProfileData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'start', lg: 'center' }}
            gap={{ sm: '12px', lg: '0px' }}
          >
            <Text minW='200px'>Last name</Text>
            <Input
              type='text'
              borderColor='#d0d5dd'
              placeholder='Enter last name'
              value={allProfileData.lastName}
              onChange={(e) =>
                setAllProfileData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'start', lg: 'center' }}
            gap={{ sm: '12px', lg: '0px' }}
          >
            <Text minW='200px'>Email</Text>
            <Input
              type='email'
              borderColor='#d0d5dd'
              placeholder='Enter email'
              value={allProfileData.email}
              onChange={(e) =>
                setAllProfileData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Flex>
        </Flex>
      </Box>

      <Flex
        alignItems='center'
        justifyContent='end'
        borderTop='1px solid #bbbbbb'
        mt='8px'
        pt='8px'
      >
        <Button
          border='1px solid #7750de'
          color='white'
          bg='#7750de'
          _hover={{ color: 'white' }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default Profile;
