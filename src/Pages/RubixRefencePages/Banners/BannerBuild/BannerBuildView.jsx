import React from "react";
import { useParams } from "react-router-dom";
import { useGetBuildBannerByIdQuery } from "../../../Services/api.service";
import BannerView from "../../../Components/Banner/BannerView";

const BannerBuildView = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBuildBannerByIdQuery(id);

  return (
      <BannerView editLink={'/banner/build/edit'} isLoading={isLoading} data={data} />
  );
};

export default BannerBuildView;
