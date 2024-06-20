import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

const BannerMainCard = ({heading, subHeading, buttonTitle, imgLink, center}) => {


  const words = heading?.split(' ');
  const firstThreeWords = words.slice(0, 3).join(' ');
  const remainingWords = words.slice(3).join(' ');



  return (
    <Box
    shadow={"md"}
    rounded={8}
    w={469}
    h={250}
    borderRadius={'sm'}
    bgImage={imgLink}
    bgSize="cover"
    bgPosition="center"
    ps={8}
    pt={14}
    >
    <Box w={center ? "92%" : "100%"} display={'flex'} flexDirection={'column'} alignItems={center ? 'center' : "start"}>
      <Text textAlign={center ? "center":'start'} w={center ? "80%" : "74%"}fontSize={"19px"} className="fw-bolder" color={"#FFFFFF"} display={'block'} as={"span"}>
      <span style={{ color: '#DE858E' }}>{firstThreeWords}</span>
      {' '}
      <span>{remainingWords}</span>
      </Text>
      <Text textAlign={center ? "center":'start'} w={center ? "92%" : "74%"} fontSize={"10px"} mt={1} className=" fw-normal" color={"#ffffff"} display={'block'} as={"span"}>
        {subHeading}
      </Text>
      <Button
    fontWeight={"normal"}
    fontSize={"9px"}
    ps={4}
    pe={4}
    pt={1}
    pb={1}
    mt={2}
    color={"#ffffff"}
    _hover={{
      bgGradient:"linear(to-r, #1E114B, purple)"
    }}
    // bg={'#1E114B'}
    // bgGradient="linear(to-r, #1E114B, purple)"
    variant={"outline"}
    // colorScheme="purple"
    rounded={4}
    size={"xs"}
    // border={'1px soild #fff'}
    
  >
    {buttonTitle}
  </Button></Box>

  </Box>
  )
}

export default BannerMainCard