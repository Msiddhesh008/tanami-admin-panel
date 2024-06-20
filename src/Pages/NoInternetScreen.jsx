import { Box, Image, Text } from '@chakra-ui/react'
import noInternet from "../assets/Error.svg"

const NoInternetScreen = () => {
  return (
    <Box
    w={'100vw'}
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={5}
    >
        <Image src={noInternet} w={300} />
        <Text color={'blue.800'} as={'span'} className='fw-bold'>No Internet !</Text>
    </Box>

  )
}

export default NoInternetScreen