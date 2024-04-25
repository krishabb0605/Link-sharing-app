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
import React, { useContext, useEffect, useState } from 'react';
import { FaLink, FaPlus } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import ReactSelect, { components } from 'react-select';
import { FaGithub } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { GlobalContext } from '../../context/global.context';
import { useToast } from '@chakra-ui/react';
import style from './index.module.css';

const dataValue = [
  {
    value: 'GitHub',
    label: 'GitHub',
    icon: 'FaGithub',
  },
  {
    value: 'YouTube',
    label: 'YouTube',
    icon: 'FaYoutube',
  },
  {
    value: 'LinkedIn',
    label: 'LinkedIn',
    icon: 'FaLinkedin',
  },
  {
    value: 'Telegram',
    label: 'Telegram',
    icon: 'FaTelegram',
  },
];

const Content = () => {
  const [linkCount, setLinkCount] = useState(
    JSON.parse(localStorage.getItem('linkCountData')) || []
  );
  const [allSocialMediaData, setAllSocialMediaData] = useState(
    JSON.parse(localStorage.getItem('linksData')) || []
  );
  const { handleAllData } = useContext(GlobalContext);
  const toast = useToast();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data')) || dataValue
  );

  useEffect(() => {
    localStorage.setItem('linkCountData', JSON.stringify(linkCount));
    localStorage.setItem('linksData', JSON.stringify(allSocialMediaData));
  }, [linkCount, allSocialMediaData]);

  useEffect(() => {
    const updatedDataValue = dataValue.filter(
      (item) =>
        !allSocialMediaData.map((data) => data.media).includes(item.value)
    );
    setData(updatedDataValue);
    localStorage.setItem('data', JSON.stringify(updatedDataValue)); // Update local storage here
  }, [allSocialMediaData]);

  const Option = (props) => {
    const icon = props.data.icon.toLowerCase().includes('git')
      ? FaGithub
      : props.data.icon.toLowerCase().includes('you')
      ? FaYoutube
      : props.data.icon.toLowerCase().includes('telegram')
      ? FaTelegram
      : FaLinkedin;

    return (
      <components.Option {...props}>
        <Flex alignItems='center' gap='8px'>
          <Icon as={icon} fontSize='20px' />
          <Text fontSize='16px' fontWeight='400' color='#1a202c'>
            {props.data.label}
          </Text>
        </Flex>
      </components.Option>
    );
  };

  const SingleValue = ({ children, ...props }) => {
    const selectedCountry = dataValue?.find(
      (country) => country.label === children
    );
    const icon = selectedCountry.icon.toLowerCase().includes('git')
      ? FaGithub
      : selectedCountry.icon.toLowerCase().includes('you')
      ? FaYoutube
      : selectedCountry.icon.toLowerCase().includes('telegram')
      ? FaTelegram
      : FaLinkedin;
    return (
      <components.SingleValue {...props}>
        <Flex alignItems='center' gap='20px'>
          <Icon as={icon} fontSize='20px' color='purchr.gray.light' />

          <Text fontSize='14px' fontWeight='400' color='#1a202c'>
            {children}
          </Text>
        </Flex>
      </components.SingleValue>
    );
  };

  const handleAddLink = () => {
    const data = linkCount.length ? linkCount[linkCount.length - 1] : 0;
    setLinkCount([...linkCount, data + 1]);
    setAllSocialMediaData((prev) => [
      ...prev,
      { media: '', link: '', icon: '' },
    ]);
  };

  const handleRemove = (index) => {
    const newLinkCount = linkCount.slice();
    newLinkCount.splice(index, 1);
    setLinkCount(newLinkCount);

    setAllSocialMediaData((prev) => prev.filter((item, i) => i !== index));
  };

  const handleSocialMedia = (value, index) => {
    setAllSocialMediaData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, media: value.value, icon: value.icon } : item
      )
    );
    // setData((prev) => prev.filter((item) => item.value !== value.value));
  };

  const handleLinkChange = (value, index) => {
    setAllSocialMediaData((prev) =>
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
          {linkCount.map((number, index) => (
            <Flex flexDir='column' gap='12px' key={number}>
              <Flex alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap='8px'>
                  <Icon as={IoMenu} />
                  <Text fontWeight='700' lineHeight='normal'>
                    Link #{number}
                  </Text>
                </Flex>
                <Text onClick={() => handleRemove(index)} cursor='pointer'>
                  Remove
                </Text>
              </Flex>

              <Box>
                <Text>Platform</Text>
                <ReactSelect
                  isSearchable='false'
                  options={data}
                  className={style.customCss}
                  value={data.find(
                    (item) => item.value === allSocialMediaData[index]?.media
                  )}
                  onChange={(e) => handleSocialMedia(e, index)}
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
                    value={allSocialMediaData[index]?.link || ''}
                    onChange={(e) => handleLinkChange(e.target.value, index)}
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
