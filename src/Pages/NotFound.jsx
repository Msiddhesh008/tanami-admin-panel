import { Box, Image } from "@chakra-ui/react"
import error from "../assets/Error.svg"
const NotFound = () => {
  return (
    
    <Box
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={5}
    >
        <Image src={error} w={300} />
        {/* <Text color={'blue.800'} as={'span'} className='fw-bold'>No Internet !</Text> */}
    </Box>
  )
}

export default NotFound