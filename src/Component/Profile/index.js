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

const Profile = () => {
  const [allProfileData, setAllProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });

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
      handleAllData(allProfileData);
      setAllProfileData({
        firstName: '',
        lastName: '',
        email: '',
        image: '',
      });
    }
  };

  return (
    <Box color='#737373' width='80%'>
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

        <TableContainer mt='44px'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Td ps='0'>Profile picture</Td>
                <Td>
                  <input
                    type='file'
                    accept=' image/jpeg, image/png'
                    name='image'
                    id='file'
                    onChange={handleImageChange}
                  />
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td ps='0'>First name</Td>
                <Td>
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
                </Td>
              </Tr>
              <Tr>
                <Td ps='0'>last name</Td>
                <Td>
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
                </Td>
              </Tr>
              <Tr>
                <Td ps='0'>Email</Td>
                <Td>
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
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
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
