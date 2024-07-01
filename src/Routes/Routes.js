
import DeletionHistory from "../Pages/AccountDeletion/DeletionHistory";
import DeletionRequest from "../Pages/AccountDeletion/DeletionRequest";
import Academy from "../Pages/Admin/Academy";
import BankDetails from "../Pages/Admin/BankDetails";
import BankInvestor from "../Pages/Admin/BankInvestor";
import Contact from "../Pages/Admin/Contact";
import Notification from "../Pages/Admin/Notification";
import Users from "../Pages/Admin/Users";
import CreateIO from "../Pages/IO_Management/CreateIO";
import Create from "../Pages/IO_Management/CreateIO";
import ViewIO from "../Pages/IO_Management/ViewIO";
import View from "../Pages/IO_Management/ViewIO";
import InvestorPendingRequest from "../Pages/InvestorUpgrade/InvestorRequest";
import UpgradeHistory from "../Pages/InvestorUpgrade/UpgradeHistory";
import upgradeHistory from "../Pages/InvestorUpgrade/UpgradeHistory";
import InvestorDetails from "../Pages/Investor_Management/InvestorDetails";
import InvestorTransactions from "../Pages/Investor_Management/InvestorTransactions";
import ExchangeRate from "../Pages/Master/ExchangeRate/ExchangeRate";
import AddInvestmentType from "../Pages/Master/InvestmentType/AddInvestmentType";
import EditInvestmentType from "../Pages/Master/InvestmentType/EditInvestmentType";
import InvestmentType from "../Pages/Master/InvestmentType/InvestmentType";
import ViewInvestmentType from "../Pages/Master/InvestmentType/ViewInvestmentType";
import AddSponser from "../Pages/Master/Sponser/AddSponser";
import EditSponser from "../Pages/Master/Sponser/EditSponser";
import Sponser from "../Pages/Master/Sponser/Sponsers";
import ViewSponser from "../Pages/Master/Sponser/ViewSponser";
import PendingRequest from "../Pages/WithDrawal/PendingRequest";
import ViewHistory from "../Pages/WithDrawal/ViewHistory";

export const RouteLink = [
  // =============[ Tanami ]================
  // ===============[ Management]===============
  { path: "/", Component: Sponser },
  { path: "/sponser", Component: Sponser },
  { path: "/sponser/add-sponser", Component: AddSponser },
  { path: "/sponser/view-sponser/:id", Component: ViewSponser },
  { path: "/sponser/edit-sponser/:id", Component: EditSponser },




  { path: "/exchange-rate", Component: ExchangeRate },
  { path: "/investment-type", Component: InvestmentType },
  { path: "/investment-type/add-investment", Component: AddInvestmentType },
  { path: "/investment-type/view-investment/:id", Component: ViewInvestmentType },
  { path: "/investment-type/edit-investment/:id", Component: EditInvestmentType },

  // ===============[ IO Management]===============
  { path: "/create-io", Component: CreateIO },
  { path: "/view-io", Component: ViewIO },

  // ===============[ Investor Management]===============
  { path: "/investor-details", Component: InvestorDetails },
  { path: "/investor-transactions", Component: InvestorTransactions },

  // ===============[ Withdrawal]===============
  { path: "/withdraw-request", Component: PendingRequest },
  { path: "/withdraw-history", Component: ViewHistory },

  // ===============[ Withdrawal]===============
  { path: "/investor-history", Component: UpgradeHistory },
  { path: "/investor-request", Component: InvestorPendingRequest },

  // ===============[ Deletion]===============
  { path: "/deletion-request", Component: DeletionRequest },
  { path: "/deletion-history", Component: DeletionHistory },

  // ===============[ Admin]===============
  { path: "/bank-investor", Component: BankInvestor },
  { path: "/academy", Component: Academy },
  { path: "/notification", Component: Notification },
  { path: "/contact", Component: Contact },
  { path: "/users", Component: Users },
  { path: "/bank-details", Component: BankDetails },
];
