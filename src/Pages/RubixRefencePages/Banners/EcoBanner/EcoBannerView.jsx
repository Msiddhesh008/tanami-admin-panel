import React from "react";
import { useParams } from "react-router-dom";
import { useGetEcoBannerByIdQuery, useGetLearnBannerByIdQuery, useGetNewsBannerByIdQuery } from "../../../Services/api.service";
import BannerView from "../../../Components/Banner/BannerView";

const EcoBannerView = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetEcoBannerByIdQuery(id);

  
  return <BannerView editLink={'/banner/eco/edit'} isLoading={isLoading} data={data} />;
};

export default EcoBannerView;
