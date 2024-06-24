import AddBanner from "../../../Components/Banner/AddBanner";
import { useCreateHomeBannerMutation } from "../../../Services/api.service";

const HomeBannerAdd = () => {
  const [createLearnBannerData] = useCreateHomeBannerMutation();
  return (
    <AddBanner
    center={true}
      title={"Home banner"}
      navigateLink={"/banner/home"}
      createApi={createLearnBannerData}
    />
  );
};

export default HomeBannerAdd;
