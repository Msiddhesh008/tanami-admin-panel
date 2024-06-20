import { Box, Button, Container, Text } from "@chakra-ui/react";
import banner from "../assets/communityBanner.webp";

const BannerContent = [
  {
    heading1: `Welcome To The`,
    heading2: `Rubix Community`,
  },
  {
    subheading: `This is a space for enterprises, dApp developers, stakeholders 
    and blockchain advocates to aggregate resources and ideas to make a difference
     through our green blockchain technology.`,
  },
  {
    btn: `Explore our community`,
  },
];

const CommunityBanner = () => {
  return (
    <Box
      height={"75%"}
      backgroundImage={`url(${banner})`}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      display={"grid"}
      placeContent={"center"}
    >
      <Container
        alignItems={"center"}
        display={"flex"}
        height={"100%"}
        alignContent={"center"}
        maxW="container.xl"
        textAlign={"left"}
        marginTop={"2rem"}
        paddingLeft={"3.5rem"}
      >
        <Box
          width={"75%"}
        >
          <Text
            fontWeight={700}
            fontSize={"30px"}
            // textTransform={"upperCase"}
            color={"#DE858E"}
            lineHeight={"42px"}
            letterSpacing={"1px"}
            sx={{
              "@media (max-width: 996px)": {
                fontSize: "46px",
              },
              "@media (max-width: 600px)": {
                fontSize: "40px",
                marginBottom: "0rem",
                lineHeight: "54px",
              },
            }}
          >
            <span
              style={{
                color: "#fff",
              }}
            >
              {BannerContent[0].heading1}
            </span>{" "}
            <br />
            {BannerContent[0].heading2}
          </Text>
          <Box
            marginTop={"0.5rem"}
            width={"80%"}
            sx={{
              "@media (max-width: 500px)": {
                width: "100%",
              },
            }}
          >
            <Text
              color={"#fff"}
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight={"27.5px"}
              fontFamily={"Poppins"}
              textTransform={"capitalize"}
            >
              {BannerContent[1].subheading}
            </Text>
          </Box>
          <Button
            position={"relative"}
            backgroundColor={"transparent"}
            cursor={"pointer"}
            transition="0.3s ease-in-out"
            color={"#fff"}
            width={"180px"}
            height={"44px"}
            fontFamily={"Poppins"}
            fontWeight={"400"}
            border={"1px solid white"}
            borderRadius={"10px"}
            fontSize={"12px"}
            zIndex={"1"}
            overflow={"hidden"}
            marginTop={"0.5rem"}
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
            {BannerContent[2].btn}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CommunityBanner;
