import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import {
  useGetBuildBannerQuery,
  useGetCommunityBannerQuery,
  useGetEcoBannerQuery,
  useGetHomeBannerQuery,
  useGetLearnBannerQuery,
  useGetNewsBannerQuery,
} from "../../Services/api.service";
import Header from "../../Components/Header";
import BannerStack from "../../Components/BannerStack";

const Banner = () => {
  const communityBanner = useGetCommunityBannerQuery();
  const learnBanner = useGetLearnBannerQuery();
  const buildBanner = useGetBuildBannerQuery();
  const newsBanner = useGetNewsBannerQuery();
  const homeBanner = useGetHomeBannerQuery();
  const ecoBanner = useGetEcoBannerQuery();

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Header title={"Banners"} />

      
      <BannerStack
        stackTitle={"Home banner"}
        viewAllLink={"/banner/home"}
        bannerIsLoading={homeBanner?.isLoading}
        bannerArray={homeBanner?.data?.data?.rows?.slice(0, 3)}
        viewBannerLink={"/banner/home/view"}
      />

      <Divider/>
      <BannerStack
        stackTitle={"Community banner"}
        viewAllLink={"/banner/banner-community"}
        bannerIsLoading={communityBanner?.isLoading}
        bannerArray={communityBanner?.data?.data?.rows?.slice(0, 3)}
        // bannerArray={communityBanner?.data?.data?.rows?.filter(item => item?.status === true)}
        viewBannerLink={"/banner/banner-community/view"}
      />
      <Divider />
      <BannerStack
        stackTitle={"Learn banner"}
        viewAllLink={"/banner/learn"}
        bannerIsLoading={learnBanner?.isLoading}
        bannerArray={learnBanner?.data?.data?.rows?.slice(0, 3)}
        viewBannerLink={"/banner/learn/view"}
      />
      <Divider />
      <BannerStack
        stackTitle={"Build banner"}
        viewAllLink={"/banner/build"}
        bannerIsLoading={buildBanner?.isLoading}
        bannerArray={buildBanner?.data?.data?.rows?.slice(0, 3)}
        viewBannerLink={"/banner/build/view"}
      />
      {/* <Divider />
      <BannerStack
        stackTitle={"News banner"}
        viewAllLink={"/banner/news"}
        bannerIsLoading={newsBanner?.isLoading}
        bannerArray={newsBanner?.data?.data?.rows?.slice(0, 3)}
        viewBannerLink={"/banner/news/view"}
      /> */}
      <Divider />
      <BannerStack
        stackTitle={"Ecosystem banner"}
        viewAllLink={"/banner/eco"}
        bannerIsLoading={ecoBanner?.isLoading}
        bannerArray={ecoBanner?.data?.data?.rows?.slice(0, 3)}
        viewBannerLink={"/banner/eco/view"}
      />
    </Box>
  );
};

export default Banner;
