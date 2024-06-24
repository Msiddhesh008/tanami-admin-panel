import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCommunityBannerByIdQuery } from "../../../Services/api.service";
import {
  Box,
  Button,
  Divider,
  Image,
  StackDivider,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import FullscreenLoaders from "../../../Components/Loaders/FullscreenLoaders";
import { formatDate } from "../../../Components/Functions/UTCConvertor";
import Header from "../../../Components/Header";
import BannerView from "../../../Components/Banner/BannerView";

const BannerComunityViewPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCommunityBannerByIdQuery(id);

  return <BannerView editLink={'/banner/banner-community/edit'} isLoading={isLoading} data={data} />;
  
};

export default BannerComunityViewPage;
