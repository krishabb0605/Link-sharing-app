import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { FaLink, FaPlus } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import ReactSelect, { components } from 'react-select';
import { FaGithub } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { GlobalContext } from '../../context/global.context';
import { useToast } from '@chakra-ui/react';
import style from './index.module.css';

const dataValue = [
  {
    value: 'GitHub',
    label: 'GitHub',
    icon: FaGithub,
  },
  {
    value: 'YouTube',
    label: 'YouTube',
    icon: FaYoutube,
  },
  {
    value: 'LinkedIn',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
];

const Content = () => {
  const [linkCount, setLinkCount] = useState([]);
  const [allSocialMediaData, setAllSocialMedia] = useState([]);
  const { handleAllData } = useContext(GlobalContext);
  const toast = useToast();

  const [data, setData] = useState(dataValue);

  const Option = (props) => (
    <components.Option {...props}>
      <Flex alignItems='center' gap='8px'>
        <Icon as={props.data.icon} fontSize='20px' />
        <Text fontSize='16px' fontWeight='400' color='#1a202c'>
          {props.data.label}
        </Text>
      </Flex>
    </components.Option>
  );

  const SingleValue = ({ children, ...props }) => {
    const selectedCountry = dataValue?.find(
      (country) => country.label === children
    );
    return (
      <components.SingleValue {...props}>
        <Flex alignItems='center' gap='20px'>
          <Icon
            as={selectedCountry?.icon}
            fontSize='20px'
            color='purchr.gray.light'
          />

          <Text fontSize='14px' fontWeight='400' color='#1a202c'>
            {children}
          </Text>
        </Flex>
      </components.SingleValue>
    );
  };
  console.log(linkCount);
  const handleAddLink = () => {
    // setLinkCount((prev) => [...prev, linkCount.length + 1]);
    const data = linkCount.length ? linkCount[linkCount.length - 1] : 0;
    setLinkCount([...linkCount, data + 1]);
    setAllSocialMedia((prev) => [...prev, { media: '', link: '' }]);
  };

  const handleRemove = (number) => {
    const a = linkCount.indexOf(number);

    const newLinkCount = linkCount.slice();
    newLinkCount.splice(a, 1);
    setLinkCount(newLinkCount);

    setAllSocialMedia((prev) =>
      prev.filter((_, index) => index !== number - 1)
    );
  };

  const handleSocialMedia = (value, index) => {
    setAllSocialMedia((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, media: value.value, icon: value.icon } : item
      )
    );
    setData((prev) => prev.filter((item) => item.value !== value.value));
  };

  const handleLinkChange = (e, index) => {
    const { value } = e.target;
    setAllSocialMedia((prev) =>
      prev.map((item, i) => (i === index ? { ...item, link: value } : item))
    );
  };

  const handleSave = () => {
    if (
      allSocialMediaData.every((data) => data.media !== '' && data.link !== '')
    ) {
      toast({
        description: 'Your changes have been successfully saved !',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      handleAllData(allSocialMediaData, true);
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
    <Box color='#737373' width={{ base: '100%', lg: '80%' }}>
      <Box
        height={{
          base: 'calc(100vh - 200px)',
          sm: 'calc(100vh - 300px)',
        }}
      >
        <Box>
          <Text fontWeight='700' fontSize='30px' color='black'>
            Customize your links
          </Text>
          <Text>
            Add/edit/remove links below and then share all your profiles with
            the world !
          </Text>
        </Box>

        <Button
          border='1px solid #7750de'
          w='100%'
          mt='28px'
          onClick={handleAddLink}
        >
          <Flex color='#7750de' gap='4px'>
            <Icon as={FaPlus} />
            <Text lineHeight='normal'>Add new link</Text>
          </Flex>
        </Button>

        <Flex
          flexDir='column'
          gap='34px'
          mt='44px'
          maxH={{ base: 'calc(100vh - 420px)', sm: 'calc(100vh - 490px)' }}
          overflowY='auto'
          style={{ scrollbarWidth: 'thin' }}
        >
          {linkCount.map((number) => (
            <Flex flexDir='column' gap='12px' key={number}>
              <Flex alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap='8px'>
                  <Icon as={IoMenu} />
                  <Text fontWeight='700' lineHeight='normal'>
                    Link #{number}
                  </Text>
                </Flex>
                <Text onClick={() => handleRemove(number)} cursor='pointer'>
                  Remove
                </Text>
              </Flex>

              <Box>
                <Text>Platform</Text>
                <ReactSelect
                  options={data}
                  className={style.customCss}
                  onChange={(e) => handleSocialMedia(e, number - 1)}
                  menuPlacement='auto'
                  styles={{
                    singleValue: (provided) => ({
                      ...provided,
                      display: 'flex',
                      alignItems: 'center',
                    }),
                    indicatorSeparator: (provided) => ({
                      ...provided,
                      display: 'none',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: '#1e2022',
                      backgroundColor: state.isSelected ? '#e2e8ee' : 'white',
                      cursor: 'pointer',
                      padding: '8px 0 8px 20px',
                      margin: '4px 0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      '&:hover': { backgroundColor: '#e2e8ee' },
                    }),
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '6px',
                      borderColor: '#d0d5dd',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: '4px 8px',
                    }),
                    menu: (provided) => ({
                      ...provided,
                      position: 'relative',
                      zIndex: '1',
                    }),
                  }}
                  components={{
                    Option,
                    SingleValue,
                  }}
                />
              </Box>

              <Box>
                <Text>Link</Text>
                <InputGroup bg='white' borderRadius='8px' borderColor='#d0d5dd'>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={FaLink} />
                  </InputLeftElement>
                  <Input
                    type='text'
                    placeholder='Link'
                    _focusVisible={{
                      boxShadow: 'none',
                      borderColor: '#3182ce',
                    }}
                    _hover={{ borderColor: 'black' }}
                    value={allSocialMediaData[number - 1]?.link || ''}
                    onChange={(e) => handleLinkChange(e, number - 1)}
                  />
                </InputGroup>
              </Box>
            </Flex>
          ))}
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
          width={{ base: '100%', sm: '24%' }}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default Content;
