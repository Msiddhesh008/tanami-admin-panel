import React from "react";
import { useParams } from "react-router-dom";
import { useGetLearnBannerByIdQuery, useGetNewsBannerByIdQuery } from "../../../Services/api.service";
import BannerView from "../../../Components/Banner/BannerView";

const BannerNewsView = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetNewsBannerByIdQuery(id);

  
  return <BannerView editLink={'/banner/news/edit'} isLoading={isLoading} data={data} />;
};

export default BannerNewsView;
