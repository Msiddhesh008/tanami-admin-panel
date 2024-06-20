import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import noInternet from "../assets/Error.svg"

const UnderConstruction = () => {
  return (
    <Box
    w={'100vw'}
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'statr'}
    flexDirection={'column'}
    ms={"30vw"}
    gap={8}
    >
      <Box w={300} className='d-flex justify-content-start align-items-center flex-column gap-2'>
        <Image src={noInternet} w={300} />
        <Text color={'purple.900'} as={'span'} className='fw-bold'>Comming soon...</Text>
        </Box>
    </Box>
  )
}

export default UnderConstruction