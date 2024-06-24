import { Box } from '@chakra-ui/react'
import React from 'react'
import { OPACITY_ON_LOAD } from '../../../Layout/animations'

const ExchangeRate = () => {
  return (
    <Box {...OPACITY_ON_LOAD} bg={"green.200"} overflowY={"scroll"} height={"100vh"}></Box>
  )
}

export default ExchangeRate