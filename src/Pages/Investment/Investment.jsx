import { Box } from '@chakra-ui/react'
import React from 'react'
import { OPACITY_ON_LOAD } from '../../Layout/animations'

const Investment = () => {
  return (
    <Box {...OPACITY_ON_LOAD} bg={"green.100"} overflowY={"scroll"} height={"100vh"}></Box>
  )
}

export default Investment