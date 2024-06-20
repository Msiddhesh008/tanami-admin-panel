import React from "react";
import { useParams } from "react-router-dom";
import { useGetLearnBannerByIdQuery } from "../../../Services/api.service";
import BannerView from "../../../Components/Banner/BannerView";

const BannerLearnView = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetLearnBannerByIdQuery(id);

  
  return <BannerView editLink={'/banner/learn/edit'} isLoading={isLoading} data={data} />;
};

export default BannerLearnView;
