import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import CommunityBannerCard from "../Pages/Community/CommunityBannerCard";

const BannerStack = ({
  stackTitle,
  viewAllLink,
  bannerIsLoading,
  bannerArray,
  viewBannerLink,
}) => {


  return (
    <Box >
      <HStack
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pe={1}
      >
        <Text as={"span"} color={"purple.900"} className="web-text-large fw-bold">
          {stackTitle}
        </Text>

        <Link to={viewAllLink}>
          <Button
            variant="ghost"
            rightIcon={<ArrowForwardIcon />}
            colorScheme={"purple"}
            size="sm"
          >
            View all
          </Button>
        </Link>
      </HStack>

      <Box
        display={"flex"}
        // bg={"red.500"}
        alignItems={"start"}
        flexWrap={"wrap"}
        justifyContent={"start"}
        w={"100%"}
        // h={"auto"}
        h={200}
        ps={1}
      >
        {bannerIsLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} className="col-4 p-2 ps-0">
                <Skeleton w={"100%"} rounded={"md"} height={180} />
              </Box>
            ))
          : bannerArray?.map(
              ({
                id,
                CTO_button_title,
                banner_image,
                Heading,
                createdAt,
                sub_heading,
                status
              }) => (
                <Link className="col-4 h-100 p-3 ps-0" key={id} to={`${viewBannerLink}/${id}`}>
                  <CommunityBannerCard
                    status={status}
                    bgImage={banner_image}
                    subHeading={sub_heading}
                    heading={Heading}
                    createdAt={createdAt}
                    ctoBtnTitle={CTO_button_title}
                  />
                </Link>
              )
            )}
      </Box>
    </Box>
  );
};

export default BannerStack;
