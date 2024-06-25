import { HiOutlineNewspaper } from "react-icons/hi";
import { TbBrandMedium, TbChartHistogram, TbReportMoney } from "react-icons/tb";
import { RiBankLine, RiFileUserLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { VscGitPullRequestGoToChanges, VscSymbolClass } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiCrown } from "react-icons/pi";
import { MdOutlineAddChart, MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { TbTransactionDollar } from "react-icons/tb";
import { TbCalendarDollar } from "react-icons/tb";
import { TbDeviceDesktopDollar } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrDocumentUpdate, GrManual } from "react-icons/gr";
import { MdBrowserUpdated } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { SiAcademia } from "react-icons/si";
import { LuContact } from "react-icons/lu";
import { LiaCrownSolid } from "react-icons/lia";
import { PiCrownDuotone } from "react-icons/pi";

export const nav = [
  {
    title: "MASTER MENU",
    type: "title",
  },
  {
    title: "Master",
    submenu: [
      {
        title: "Sponser Master",
        path: "/sponser",
        icon: RiMoneyDollarBoxLine
      },
      {
        title: "Investment Type",
        path: "/investment-type",
        icon: VscSymbolClass
      },
      {
        title: "Exchange Rate",
        path: "/exchange-rate",
        icon: RiExchangeBoxLine
      },
    ],
    type: "accordion",
    Icon: TbBrandMedium,
  },
  {
    title: "IO Management",
    submenu: [
      {
        title: "Create IO",
        path: "/create-io",
        icon: MdOutlineAddChart
      },
      {
        title: "View IO",
        path: "/view-io",
        icon: HiOutlineChartSquareBar
      },
    ],
    type: "accordion",
    Icon: TbDeviceDesktopDollar,
  },
  {
    title: "Investor Management",
    submenu: [
      {
        title: "Investor Details",
        path: "/investor-details",
        icon: TbListDetails
      },
      {
        title: "Investor Transactions",
        path: "/investor-transactions",
        icon: TbTransactionDollar
      },
    ],
    type: "accordion",
    Icon: TbCalendarDollar,
  },
  {
    title: "INVESTORS REQUEST",
    type: "title",
  }, {
    title: "Withdrawal",
    submenu: [
      {
        title: "Pending Request",
        path: "/withdraw-request",
        icon: RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/withdraw-history",
        icon: RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: BiMoneyWithdraw,
  },
  {
    title: "Investor Upgradation",
    submenu: [
      {
        title: "Pending Request",
        path: "/investor-request",
        icon: RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/investor-history",
        icon: RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: MdBrowserUpdated,
  },
  {
    title: "Account Deletion",
    submenu: [
      {
        title: "Pending Request",
        path: "/deletion-request",
        icon: RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/deletion-history",
        icon: RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: AiOutlineUserDelete,
  },
  {
    title: "MANAGE ADMIN",
    type: "title",
  }, {
    title: "Admin",
    submenu: [
      {
        title: "Ban / Unban Investor",
        path: "/bank-investor",
        icon: TbReportMoney
      },
      {
        title: "Academy",
        path: "/academy",
        icon: GrManual
      },
      {
        title: "Notification",
        path: "/notification",
        icon: MdNotificationsNone
      },
      {
        title: "Contact Details",
        path: "/contact",
        icon: LuContact
      },
      {
        title: "Users",
        path: "/users",
        icon: RiFileUserLine
      },
      {
        title: "Bank Details",
        path: "/bank-details",
        icon: RiBankLine
      }
    ],
    type: "accordion",
    Icon: MdOutlineAdminPanelSettings,
  },
  // {
  //   title: "Single Link",
  //   type: "single",
  //   path: "/logout",
  //   Icon: HiOutlineNewspaper,
  // },
];



export const nestedNav = [
  {
    title: "MAIN MENU",
    type: "accordion",
    accArray: [
      {
        title: "Master",
        submenu: [
          {
            title: "Sponser",
            path: "/sponser",
            icon: RiMoneyDollarBoxLine
          },
          {
            title: "Exchange rate",
            path: "/exchange-rate",
            icon: RiExchangeBoxLine
          },
          {
            title: "Asset classes",
            path: "/view",
            icon: VscSymbolClass
          },
        ],
        type: "accordion",
        Icon: TbBrandMedium,
      },
      {
        title: "User",
        submenu: [
          {
            title: "Sponser",
            path: "/loop",
            icon: TbBrandMedium
          },
          {
            title: "Class",
            path: "/class",
            icon: TbBrandMedium
          },
          {
            title: "View",
            path: "/view",
            icon: TbBrandMedium
          },
        ],
        type: "accordion",
        Icon: HiOutlineNewspaper,
      },
    ]
  },
  {
    title: "User",
    submenu: [
      {
        title: "Sponser",
        path: "/loop",
        icon: TbBrandMedium
      },
      {
        title: "Class",
        path: "/class",
        icon: TbBrandMedium
      },
      {
        title: "View",
        path: "/view",
        icon: TbBrandMedium
      },
    ],
    type: "accordion",
    Icon: FiUsers,
  },
  {
    title: "SPONSER",
    type: "title",
  },
  {
    title: "Single Link",
    type: "single",
    path: "/",
    Icon: HiOutlineNewspaper,
  },
];
