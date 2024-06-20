import AddBanner from "../../../Components/Banner/AddBanner";
import { useCreateLearnBannerMutation, useCreateNewsBannerMutation } from "../../../Services/api.service";

const BannerNewsAdd = () => {
  const [createNewsBannerData] = useCreateNewsBannerMutation();
  return (
    <AddBanner
      title={"News banner"}
      navigateLink={"/banner/news"}
      createApi={createNewsBannerData}
    />
  );
};

export default BannerNewsAdd;
