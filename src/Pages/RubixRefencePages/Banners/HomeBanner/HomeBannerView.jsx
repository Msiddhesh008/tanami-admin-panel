import React from "react";
import { useParams } from "react-router-dom";
import { useGetHomeBannerByIdQuery, useGetNewsBannerByIdQuery } from "../../../Services/api.service";
import BannerView from "../../../Components/Banner/BannerView";

const HomeBannerView = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetHomeBannerByIdQuery(id);

  
  return <BannerView center={true} editLink={'/banner/home/edit'} isLoading={isLoading} data={data} />;
};

export default HomeBannerView;
