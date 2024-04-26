import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../context/global.context';
import { useToast } from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const { handleAllData } = useContext(GlobalContext);
  const toast = useToast();

  const [allProfileData, setAllProfileData] = useState(
    JSON.parse(localStorage.getItem('profileData')) || {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    }
  );

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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (
      allProfileData.firstName === '' ||
      allProfileData.lastName === '' ||
      allProfileData.email === '' ||
      allProfileData.image === ''
    ) {
      toast({
        description: 'Fill All Details.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } else if (!validateEmail(allProfileData.email)) {
      toast({
        description: 'Email Id is not valid !',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        description: 'Your changes have been successfully saved !',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      handleAllData(allProfileData);
      localStorage.setItem('profileData', JSON.stringify(allProfileData));
    }
  };

  const handleReset = () => {
    const nullData = {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    };
    setAllProfileData(nullData);
    handleAllData(nullData);
    localStorage.setItem('profileData', JSON.stringify(nullData));
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
            <Flex alignItems='center' gap='8px'>
              {allProfileData.image ? (
                <Box
                  pos='relative'
                  backgroundColor={show ? 'black' : 'auto'}
                  borderRadius='8px'
                >
                  <Image
                    src={allProfileData.image}
                    h='160px'
                    w='160px'
                    onClick={handleClick}
                    borderRadius='8px'
                    opacity={show ? '0.6' : '1'}
                    cursor='pointer'
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                  />
                  <Flex
                    pos='absolute'
                    top='50%'
                    left='50%'
                    style={{ transform: 'translate(-50%,-50%)' }}
                    flexDir='column'
                    display={show ? 'flex' : 'none'}
                    alignItems='center'
                    gap='12px'
                    fontWeight='700'
                    color='white'
                    width='100%'
                    cursor='pointer'
                    onClick={handleClick}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                  >
                    <Icon as={IoImageOutline} fontSize='30px' />
                    <Text>Change Image</Text>
                  </Flex>
                </Box>
              ) : (
                <Button
                  onClick={handleClick}
                  colorScheme='blue'
                  variant='outline'
                >
                  Upload Image
                </Button>
              )}

              <input
                type='file'
                accept=' image/jpeg, image/png'
                name='image'
                id='file'
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              <label htmlFor='file' style={{ fontSize: '14px' }}>
                Image must be below 1024*1024px. <br /> Use PNG JPG, or BMP
                format.
              </label>
            </Flex>
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
        gap='8px'
      >
        <Button
          border='1px solid #7750de'
          color='white'
          bg='#7750de'
          width='80px'
          _hover={{ opacity: '0.8' }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          border='1px solid #7750de'
          color='white'
          bg='#7750de'
          width='80px'
          _hover={{ opacity: '0.8' }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default Profile;
