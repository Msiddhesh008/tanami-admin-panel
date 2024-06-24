import { HiOutlineNewspaper } from "react-icons/hi";
import { TbBrandMedium } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";


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
