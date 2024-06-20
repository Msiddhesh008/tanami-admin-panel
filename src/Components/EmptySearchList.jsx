import { Box, Image, Text } from "@chakra-ui/react"
import EmptySearchListImage from "../assets/EmptySearchList.svg"

const EmptySearchList = ({message}) => {
  return (
    <Box
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    w={"100%"} h={"80vh"}  
    >
        <Image w={200} mb={8} h={200} src={EmptySearchListImage} alt='Dan Abramov' />
        <Text className=" fw-bold fs-5" >{message}</Text>
        <Text as={'p'} className="web-text-medium">Posts of rubix will appear here.</Text>
        
    </Box>
  )
}

export default EmptySearchList