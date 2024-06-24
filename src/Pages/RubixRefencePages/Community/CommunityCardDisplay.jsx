import React from 'react'
import { useGetCommunityQuery } from '../../Services/api.service';
import CommCard from './CommCard';
import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';


const CommunityCardDisplay = () => {
    const community = useGetCommunityQuery();
    const communityData = community.data?.data?.rows
  return (
    <Box rounded={4} backgroundColor={"#101015"}>
      <Container
        cursor={'pointer'}
        maxW={"1200px"}
        padding={"0rem"}
        paddingBottom={"2rem"}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        sx={{
          "@media (max-width: 1024px)": {
            padding: "3rem",
          },
          "@media (max-width: 435px)": {},
        }}
      >
        <Text
          as={"h2"}
          paddingTop={"1rem"}
          paddingBottom={"1rem"}
          fontWeight={700}
          fontSize={"30px"}
          textAlign={"left"}
          textTransform={"capitalize"}
          color={"#fff"}
          sx={{
            "@media (max-width: 435px)": {
              fontSize: "35px",
            },
            "@media (max-width: 375px)": {
              fontSize: "28px",
              textAlign: "center",
            },
          }}
        >
          Rubix Community
        </Text>
        <SimpleGrid
        w={'100%'}
        p={4}
          spacing={"20px"}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {communityData?.map((item) => (
            <CommCard
              key={item.id}
              location={item.member_name}
              name={item.member_name}
              jobTitle={item.designation}
              description={item.description}
              linkdInd={item.linkedin}
              imageUrl={item.profile_image}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default CommunityCardDisplay