import { HiOutlineNewspaper } from "react-icons/hi";
import { TbBrandMedium } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";


export const nav = [
  {
    title: "MAIN MENU",
    type: "title",
  },
  {
    title: "Master",
    submenu: [
      {
        title: "Sponser",
        path: "/sponser",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "Exchange rate",
        path: "/exchange-rate",
        icon:RiExchangeBoxLine
      },
      {
        title: "Asset classes",
        path: "/view",
        icon:VscSymbolClass
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
        icon:TbBrandMedium
      },
      {
        title: "Class",
        path: "/class",
        icon:TbBrandMedium
      },
      {
        title: "View",
        path: "/view",
        icon:TbBrandMedium
      },
    ],
    type: "accordion",
    Icon: FiUsers,
  },
  {
    title: "Single Link",
    type: "single",
    path: "/",
    Icon: HiOutlineNewspaper,
  },
  // {
  //   title: "SPONSER",
  //   type: "title",
  // },
  // {
  //   title: "Single Link",
  //   type: "single",
  //   path: "/",
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
            icon:RiMoneyDollarBoxLine
          },
          {
            title: "Exchange rate",
            path: "/exchange-rate",
            icon:RiExchangeBoxLine
          },
          {
            title: "Asset classes",
            path: "/view",
            icon:VscSymbolClass
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
            icon:TbBrandMedium
          },
          {
            title: "Class",
            path: "/class",
            icon:TbBrandMedium
          },
          {
            title: "View",
            path: "/view",
            icon:TbBrandMedium
          },
        ],
        type: "accordion",
        Icon: HiOutlineNewspaper,
      },
    ]
  },
  ,
  {
    title: "User",
    submenu: [
      {
        title: "Sponser",
        path: "/loop",
        icon:TbBrandMedium
      },
      {
        title: "Class",
        path: "/class",
        icon:TbBrandMedium
      },
      {
        title: "View",
        path: "/view",
        icon:TbBrandMedium
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
