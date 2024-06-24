import { Box, Image, Text } from '@chakra-ui/react'
import noInternet from "../assets/noInternet.jpg"

const NoInternetScreen = () => {
  return (
    <Box
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    position={"relative"}
    gap={5}
    >
        <Image src={noInternet} w={300} />
        {/* <Text color={'blue.800'} as={'span'} className='fw-bold'>No Internet !</Text> */}

        <Text color={'gray.500'} fontSize={'sm'} fontWeight={'500'} position={'absolute'} bottom={0} left={'47%'}>Tanami v1.0</Text>
    </Box>

  )
}

export default NoInternetScreen