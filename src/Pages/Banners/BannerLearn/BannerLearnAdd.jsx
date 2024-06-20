import AddBanner from "../../../Components/Banner/AddBanner";
import { useCreateLearnBannerMutation } from "../../../Services/api.service";

const BannerLearnAdd = () => {
  const [createLearnBannerData] = useCreateLearnBannerMutation();
  return (
    <AddBanner
      title={"Learn banner"}
      navigateLink={"/banner/learn"}
      createApi={createLearnBannerData}
    />
  );
};

export default BannerLearnAdd;
