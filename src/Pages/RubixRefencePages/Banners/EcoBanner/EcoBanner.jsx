import React from "react";
import {
  useDeleteBuildBannerMutation,
  useDeleteEcoBannerMutation,
  useDeleteLearnBannerMutation,
  useDeleteNewsBannerMutation,
  useGetBuildBannerQuery,
  useGetEcoBannerQuery,
  useGetLearnBannerQuery,
  useGetNewsBannerQuery,
  useUpdateBuildBannerStatusMutation,
  useUpdateEcoBannerStatusMutation,
  useUpdateLearnBannerStatusMutation,
  useUpdateNewsBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const EcoBanner = () => {
  const ecoBanner = useGetEcoBannerQuery();
  const [deleteEcoBanner] = useDeleteEcoBannerMutation();
  const [updateEcoBuildStatus] = useUpdateEcoBannerStatusMutation();
  const { data, error, isLoading } = useUpdateNewsBannerStatusMutation();
  return (
    <BannerTable
      addLink={"/banner/eco/add-banner"}
      title={"Ecosystem Banner"}
      viewLink={"/banner/eco/view/"}
      editLink={"/banner/eco/edit/"}
      deleteApi={deleteEcoBanner}
      dataArray={ecoBanner}
      statusUpdateApi={updateEcoBuildStatus}
    />
  );
};

export default EcoBanner;
