import React from "react";
import {
  useDeleteLearnBannerMutation,
  useGetLearnBannerQuery,
  useUpdateLearnBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const BannerLearn = () => {
  const learnBanner = useGetLearnBannerQuery();
  const [deleteLearnBanner] = useDeleteLearnBannerMutation();
  const [updateLearnBannerStatus] = useUpdateLearnBannerStatusMutation();

  return (
    <BannerTable
      addLink={"/banner/learn/add-banner"}
      title={"Learn Banner"}
      viewLink={"/banner/learn/view/"}
      editLink={"/banner/learn/edit/"}
      deleteApi={deleteLearnBanner}
      dataArray={learnBanner}
      statusUpdateApi={updateLearnBannerStatus}
    />
  );
};

export default BannerLearn;
