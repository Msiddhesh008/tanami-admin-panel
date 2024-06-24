import React from "react";
import {
  useDeleteBuildBannerMutation,
  useGetBuildBannerQuery,
  useUpdateBuildBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const BannerBuild = () => {
  const buildBanner = useGetBuildBannerQuery();
  const [deleteBuildBanner] = useDeleteBuildBannerMutation();
  const [updateLearnBuildStatus] = useUpdateBuildBannerStatusMutation();

  return (
    <BannerTable
      addLink={"/banner/build/add-banner"}
      title={"Build Banner"}
      viewLink={"/banner/build/view/"}
      editLink={"/banner/build/edit/"}
      deleteApi={deleteBuildBanner}
      dataArray={buildBanner}
      statusUpdateApi={updateLearnBuildStatus}
    />
  );
};

export default BannerBuild;
