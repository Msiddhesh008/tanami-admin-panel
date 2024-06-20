import BlogsAndArticles from "../Pages/BlogsAndArticles/BlogsAndArticles";
import AddComunity from "../Pages/Community/AddComunity";
import Community from "../Pages/Community/Community";
import ComunityEditPage from "../Pages/Community/ComunityEditPage";
import ComunityViewPage from "../Pages/Community/ComunityViewPage";
import Events from "../Pages/Events/Events";
import Banner from "../Pages/Banners/Banner";
import Videos from "../Pages/Videos/Videos";
import BannerCommunity from "../Pages/Banners/BannerCommunity/BannerCommunity";
import BannerComunityEditPage from "../Pages/Banners/BannerCommunity/BannerCommunityEdit";
import BannerComunityViewPage from "../Pages/Banners/BannerCommunity/BannerCommunityView";
import AddBlogsAndArticles from "../Pages/BlogsAndArticles/AddBlogsAndArticles";
import News from "../Pages/News/News";
import AddNews from "../Pages/News/AddNews";
import EditNews from "../Pages/News/EditNews";
import ViewNews from "../Pages/News/ViewNews";
import ViewBlogsAndArticles from "../Pages/BlogsAndArticles/ViewBlogsAndArticles";
import EditBlogsAndArticles from "../Pages/BlogsAndArticles/EditBlogsAndArticles";
import BannerLearn from "../Pages/Banners/BannerLearn/BannerLearn";
import HelpAndSupport from "../Pages/News/HelpAndSupport";
import AddEvents from "../Pages/Events/AddEvents";
import ViewLearnBanner from "../Pages/Banners/BannerLearn/BannerLearnView";
import BannerBuildView from "../Pages/Banners/BannerBuild/BannerBuildView";
import BannerBuild from "../Pages/Banners/BannerBuild/BannerBuild";
import BannerNews from "../Pages/Banners/BannerNews/BannerNews";
import BannerCommunityAdd from "../Pages/Banners/BannerCommunity/BannerCommunityAdd";
import BannerLearnAdd from "../Pages/Banners/BannerLearn/BannerLearnAdd";
import BannerBuildAdd from "../Pages/Banners/BannerBuild/BannerBuildAdd";
import BannerNewsView from "../Pages/Banners/BannerNews/BannerNewsView";
import HomeBanner from "../Pages/Banners/HomeBanner/HomeBanner";
import BannerNewsAdd from "../Pages/Banners/BannerNews/BannerNewsAdd";
import HomeBannerView from "../Pages/Banners/HomeBanner/HomeBannerView";
import HomeBannerAdd from "../Pages/Banners/HomeBanner/HomeBannerAdd";
import AddWhitepapers from "../Pages/Whitepapers/AddWhitepapers";
import ViewWhitePaper from "../Pages/Whitepapers/ViewWhitePaper";
import EditWhitepaper from "../Pages/Whitepapers/EditWhitepaper";
import UnderConstruction from "../Pages/UnderConstruction";
import BannerEdit from "../Components/Banner/BannerEdit";
import BannerLearnEdit from "../Pages/Banners/BannerLearn/BannerLearnEdit";
import BannerBuildEdit from "../Pages/Banners/BannerBuild/BannerBuildEdit";
import BannerNewsEdit from "../Pages/Banners/BannerNews/BannerNewsEdit";
import BannerHomeEdit from "../Pages/Banners/HomeBanner/HomeBannerEdit";
import ViewEvents from "../Pages/Events/ViewEvents";
import EditEvents from "../Pages/Events/EditEvents";
import AddVideos from "../Pages/Videos/AddVideos";
import ViewVideos from "../Pages/Videos/ViewVideos";
import EditVideos from "../Pages/Videos/EditVideos";
import EcoBanner from "../Pages/Banners/EcoBanner/EcoBanner";
import EcoBannerAdd from "../Pages/Banners/EcoBanner/EcoBannerAdd";
import EcoBannerView from "../Pages/Banners/EcoBanner/EcoBannerView";
import EcoBannerEdit from "../Pages/Banners/EcoBanner/EcoBannerEdit";
import Usecase from "../Pages/Usecase/Usecase";
import AddUseCase from "../Pages/Usecase/AddUseCase";
import ViewUseCase from "../Pages/Usecase/ViewUseCase";
import EditUseCase from "../Pages/Usecase/EditUseCase";

import Whitepapers from "../Pages/Whitepapers/Whitepapers";
import WelcomePage from "../Pages/WelcomePage";
import AddTerms from "../Pages/Terms/AddTerms";
import Terms from "../Pages/Terms/Terms";
import EditTerms from "../Pages/Terms/EditTerms";
import ViewTerms from "../Pages/Terms/ViewTerms";
import AddPolicy from "../Pages/Policy/AddPolicy";
import ViewPolicy from "../Pages/Policy/ViewPolicy";
import EditPolicy from "../Pages/Policy/EditPolicy";
import Policy from "../Pages/Policy/Policy";
import Faq from "../Pages/Faq/Faq";
import AddFaq from "../Pages/Faq/AddFaq";
import ViewFaq from "../Pages/Faq/ViewFaq";
import EditFaq from "../Pages/Faq/EditFaq";
import Partner from "../Pages/Partners/Partner";
import AddPartner from "../Pages/Partners/AddPartners";
import ViewPartner from "../Pages/Partners/ViewPartner";
import EditPartner from "../Pages/Partners/EditPartners";
import newsLetter from "../Pages/NewLetter/NewsLetter";
import NewsLetter from "../Pages/NewLetter/NewsLetter";
import Investment from "../Pages/Investment/Investment";

export const RouteLink = [
  { path: "/", Component: WelcomePage },
  { path: "/banner", Component: Banner },
  { path: "/help-and-support", Component: HelpAndSupport },

  // =============[ Videos ]================
  { path: "/videos", Component: Videos },
  { path: "videos/add-videos", Component: AddVideos },
  { path: "videos/view/:id", Component: ViewVideos },
  { path: "videos/edit/:id", Component: EditVideos },

  // =============[ Whitepapers ]================
  { path: "/whitepaper", Component: Whitepapers },
  { path: "whitepaper/add-whitepaper", Component: AddWhitepapers },
  { path: "whitepaper/view/:id", Component: ViewWhitePaper },
  { path: "whitepaper/edit/:id", Component: EditWhitepaper },

  // =============[ Community ]================
  { path: "/community", Component: Community },
  { path: "community/view/:id", Component: ComunityViewPage },
  { path: "community/edit/:id", Component: ComunityEditPage },
  { path: "community/add-community", Component: AddComunity },

  // =============[ Community banner ]================
  { path: "banner/banner-community", Component: BannerCommunity },
  { path: "banner/banner-community/add-banner", Component: BannerCommunityAdd },
  {
    path: "banner/banner-community/edit/:id",
    Component: BannerComunityEditPage,
  },
  {
    path: "banner/banner-community/view/:id",
    Component: BannerComunityViewPage,
  },

  // =============[ learn banner ]================
  { path: "banner/learn", Component: BannerLearn },
  { path: "banner/learn/add-banner", Component: BannerLearnAdd },
  { path: "banner/learn/view/:id", Component: ViewLearnBanner },
  { path: "banner/learn/edit/:id", Component: BannerLearnEdit },

  // =============[ eco banner ]================
  { path: "banner/eco", Component: EcoBanner },
  { path: "banner/eco/add-banner", Component: EcoBannerAdd },
  { path: "banner/eco/view/:id", Component: EcoBannerView },
  { path: "banner/eco/edit/:id", Component: EcoBannerEdit },

  // =============[ build banner ]================
  { path: "banner/build", Component: BannerBuild },
  { path: "banner/build/add-banner", Component: BannerBuildAdd },
  { path: "banner/build/view/:id", Component: BannerBuildView },
  { path: "banner/build/edit/:id", Component: BannerBuildEdit },

  // =============[ news banner ]================
  { path: "banner/news", Component: BannerNews },
  { path: "banner/news/add-banner", Component: BannerNewsAdd },
  { path: "banner/news/view/:id", Component: BannerNewsView },
  { path: "banner/news/edit/:id", Component: BannerNewsEdit },

  // =============[ ecosystem banner ]================
  { path: "banner/ecosystem", Component: UnderConstruction },
  { path: "banner/ecosystem/add-banner", Component: UnderConstruction },
  { path: "banner/ecosystem/view/:id", Component: UnderConstruction },
  { path: "banner/ecosystem/edit/:id", Component: UnderConstruction },

  // =============[ home banner ]================
  { path: "banner/home", Component: HomeBanner },
  { path: "banner/home/add-banner", Component: HomeBannerAdd },
  { path: "banner/home/view/:id", Component: HomeBannerView },
  { path: "banner/home/edit/:id", Component: BannerHomeEdit },

  // =============[ blog ]================
  { path: "/blogs-articles", Component: BlogsAndArticles },
  { path: "blogs-articles/add-blog", Component: AddBlogsAndArticles },
  { path: "blogs-articles/view/:id", Component: ViewBlogsAndArticles },
  { path: "blogs-articles/edit/:id", Component: EditBlogsAndArticles },

  // =============[ news ]================
  { path: "/news", Component: News },
  { path: "/news/view/:id", Component: ViewNews },
  { path: "/news/add-news", Component: AddNews },
  { path: "/news/edit/:id", Component: EditNews },

  // =============[ events ]================
  { path: "/events", Component: Events },
  { path: "/events/add-events", Component: AddEvents },
  { path: "/events/view/:id", Component: ViewEvents },
  { path: "/events/edit/:id", Component: EditEvents },


  // =============[ useCase ]================
  { path: "/usecase", Component: Usecase },
  { path: "/usecase/add-usecase", Component: AddUseCase },
  { path: "/usecase/view/:id", Component: ViewUseCase },
  { path: "/usecase/edit/:id", Component: EditUseCase },


  // =============[ Terms ]================
  { path: "/terms", Component: Terms },
  { path: "/terms/add-terms", Component: AddTerms },
  { path: "/terms/view/:id", Component: ViewTerms },
  { path: "/terms/edit/:id", Component: EditTerms },

  // =============[ Policy ]================
  { path: "/policy", Component: Policy },
  { path: "/policy/add-policy", Component: AddPolicy },
  { path: "/policy/view/:id", Component: ViewPolicy },
  { path: "/policy/edit/:id", Component: EditPolicy },

  // =============[ Faq ]================
  { path: "/faq", Component: Faq },
  { path: "/faq/add-faq", Component: AddFaq },
  { path: "/faq/view/:id", Component: ViewFaq },
  { path: "/faq/edit/:id", Component: EditFaq },

  // =============[ Partners ]================
  { path: "/partners", Component: Partner },
  { path: "/partners/add-partners", Component: AddPartner },
  { path: "/partners/view/:id", Component: ViewPartner },
  { path: "/partners/edit/:id", Component: EditPartner },

  // =============[ NewLetter ]================
  { path: "/newsLetter", Component: NewsLetter },






  // =============[ Tanami ]================
  { path: "/investment", Component: Investment },




];
