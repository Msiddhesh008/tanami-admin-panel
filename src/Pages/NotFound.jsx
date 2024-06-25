import { Box, Image, Text } from "@chakra-ui/react"
import error from "../assets/Error.svg"
import robot from "../assets/404.png"
// import robot from "../assets/robot.png"
const NotFound = () => {
  return (
    
    <Box
    h={'100vh'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={8}
    >
        <Image src={robot} w={"171px"} />
        <Text color={'green.800'} as={'span'} fontSize={'small'}>The requested URL was not found on this server.</Text>
    </Box>
  )
}

export default NotFound