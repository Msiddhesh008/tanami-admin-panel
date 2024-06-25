import { Box, Image, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/logo2.png'

const SplashScreen = () => {
  return (
    <Box
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={10}
    >
        <Image src={logo} />
        <Spinner color='green.900' size='md' />
    </Box>
  )
}

export default SplashScreen