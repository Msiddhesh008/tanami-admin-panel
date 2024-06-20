
import { Button } from '@chakra-ui/react'
import React from 'react'

const WebButton = ({title}) => {
  return ( <Button
    position={"relative"}
    backgroundColor={"transparent"}
    cursor={"pointer"}
    transition="0.3s ease-in-out"
    color={"#fff"}
    width={"auto"}
    height={"auto"}
    p={6}
    pt={2} 
    pb={2}
    fontFamily={"Poppins"}
    fontWeight={"600"}
    border={"1px solid white"}
    borderRadius={"4px"}
    fontSize={"14px"}
    zIndex={"1"}
    overflow={"hidden"}
    sx={{
      "::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        transition: "0.35s linear",
        zIndex: -1,
        bgGradient:
          "radial-gradient(circle, #ffffff, #eee2f2, #e7c3dc, #e5a3ba, #de858e)",
        opacity: "0",
      },
      "&:hover::before": {
        width: "100%",
        height: "120%",
        borderRadius: "0px",
        opacity: "1",
      },
      "@media (max-width: 500px)": {
        fontSize: "14px",
        width: "230px",
        height: "44px",
        marginTop: "2rem",
        bgGradient:
          "radial-gradient(circle, #ffffff, #eee2f2, #e7c3dc, #e5a3ba, #de858e)",
        color: "#000",
        fontWeight: "600",
      },
    }}
    _hover={{
      color: "#000",
      border: "1px solid white",
      zIndex: 1,
    }}
  >
    {title}
  </Button>
  )
}

export default WebButton