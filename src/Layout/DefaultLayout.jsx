import React, { useContext, useState } from "react";
import logo from "../assets/logo2.png";
import logoMini from "../assets/logo-min.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/auth";
import Button02 from "../Components/Buttons/Button02";
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RouteLink } from "../Routes/Routes";
import NotFound from "../Pages/NotFound";
import { nav } from "../Routes/Nav";
import {
  Avatar,
  Box,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  WrapItem,
  Popover,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Cookies from "js-cookie"; // Import the Cookies library
import Header from "../Components/Header";
import HeaderMain from "../Components/HeaderMain";
import { IoMdSwap } from "react-icons/io";
import { RiExchangeBoxLine, RiMoneyDollarBoxLine } from "react-icons/ri";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDrawerClick, setOpenDrawerClick] = useState(true);
  const { setIsAuthenticate } = useContext(GlobalStateContext);
  const [slideFromRight, setSlideFormRight] = useState(false);

  const openDrawerOnClick = () => {
    setOpenDrawerClick(!openDrawerClick);
  };

  const logOutHandler = () => {
    // dispach(loginUser(false));
    setIsAuthenticate(false);
    Cookies.remove("isAuthenticated");
    navigate("/login");
  };

  // // Function to get the title based on the route
  const getTitle = () => {
    switch (path) {
      case "/":
        return "👋🏻 Hi, Admin";
      case "/sponser":
      case "/sponser/add-sponser":
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0" /> Sponser
          </span>
        );
      case "/exchange-rate":
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" /> Echange rate
          </span>
        );
      case "/community/add-comunity":
        return (
          <Text color={"teal.800"} className="d-flex align-items-center">
            <Link to={"/community/"}>
              <ArrowBackIcon className="me-2 fs-3 link p-1 rounded-1" />
            </Link>
            Community
          </Text>
        );
      default:
        if (path.startsWith("/community/view/")) {
          return (
            <span className="d-flex align-items-center">
              <Link to={"/community/"}>
                <ArrowBackIcon className="me-2  fs-3 link p-1 rounded-1" />
              </Link>
              Community
            </span>
          );
        } else if (path.startsWith("/community/edit/")) {
          return (
            <span className="d-flex align-items-center">
              <Link to={"/community/"}>
                <ArrowBackIcon className="me-2 fs-3 link p-1 rounded-1" />
              </Link>
              Community
            </span>
          );
        }
        return "Tanami";
    }
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
      className="d-flex"
      pe={0.5}
    >
      <Box
        bottom={4}
        right={!slideFromRight ? 4 : "auto"}
        left={slideFromRight ? 4 : "auto"}
        backgroundColor={"#fff"}
        rounded={"full"}
        p={2}
        w={8}
        h={8}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"#004118"}
        fontWeight={"800"}
        cursor={"pointer"}
        position={"absolute"}
        transition={"0.5s"}
        boxShadow={"md"}
        onClick={() => setSlideFormRight(!slideFromRight)}
        _hover={{
          opacity: 1,
        }}
        zIndex={999}
      >
        <IoMdSwap />
      </Box>

      {slideFromRight ? null : (
        <aside
          className="h-100 position-relative sideBar  pe-1"
          // onMouseOver={() => setIsDrawerOpen(true)}
          // onMouseLeave={() => setIsDrawerOpen(false)}
          style={{
            width: isDrawerOpen || openDrawerClick ? 225 : 74,
            transition: "width 0.3s ease-in-out", // Smooth transition for width change
            overflow: "hidden", // Hide overflow to prevent content overflow during transition
            backgroundColor: "#0041180A",
            position: "relative",
            // backgroundColor: "#002F0F",
          }}
        >
          <div
            className={`d-flex  ${
              isDrawerOpen || openDrawerClick
                ? "justify-content-start"
                : "justify-content-center"
            }  p-3 pt-3 pb-4 position-relative `}
            height={"10%"}
          >
            {isDrawerOpen || openDrawerClick ? (
              <img
                style={{
                  width: 120,
                }}
                src={logo}
                alt="Logo"
              />
            ) : (
              <img
                style={{
                  width: 30,
                }}
                src={logoMini}
                alt="Logo"
              />
            )}
          </div>

          <Box
            className="ps-2 scroll-bar"
            style={{ height: "80%", overflowY: "scroll", overflowX: "hidden" }}
          >
            <Accordion m={0} allowToggle>
              {nav.map(({ title, type, Icon, submenu, path }, index) => {
                if (type === "accordion") {
                  return (
                    <AccordionItem key={index} border={"none"}>
                      <AccordionButton
                        style={{ height: "auto" }}
                        className={`${
                          isDrawerOpen || openDrawerClick
                            ? "p-2 web-text-medium ps-3 justify-content-between"
                            : "p-2 ps-1 web-text-xlarge justify-content-center"
                        } rounded-1 link d-flex align-items-center gap-2 w-100 mb-1`}
                      >
                        <Box
                          as="span"
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                        >
                          {Icon && <Icon className="web-text-large" />}
                          <Text
                            as={"span"}
                            display={
                              isDrawerOpen || openDrawerClick ? "flex" : "none"
                            }
                            alignItems="center"
                            overflow="hidden"
                          >
                            {title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        p={0}
                        pb={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        {submenu?.map(
                          (
                            { title: subMenuTitle, path: link, icon: SubIcon },
                            i
                          ) => (
                            <Box
                              key={i}
                              style={{ height: "auto", position: "relative" }}
                              className={`${
                                isDrawerOpen || openDrawerClick
                                  ? " web-text-medium ps-4"
                                  : " web-text-xlarge  justify-content-center"
                              }  d-flex align-items-center  p-0`}
                            >
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  width: 2,
                                  left: 20,
                                  height:
                                    i === submenu?.length - 1 ? "55%" : "120%",
                                  borderRadius: "0 0 10px 10px",
                                }}
                              />
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  width: 8,
                                  left: 20,
                                  height: 2,
                                }}
                              />

                              <NavLink
                                className={`${
                                  isDrawerOpen || openDrawerClick
                                    ? "p-2 ps-1 ms-1 web-text-medium "
                                    : "p-2 ps-0 ms-0 zindex-3 ms-4 web-text-xlarge justify-content-center"
                                } rounded-1 link d-flex align-items-center gap-2 w-100 `}
                                to={link}
                              >
                                {SubIcon && (
                                  <SubIcon
                                    className="web-text-large ms-2"
                                    style={{ zIndex: 111 }}
                                  />
                                )}
                                <Text
                                  as={"span"}
                                  display={
                                    isDrawerOpen || openDrawerClick
                                      ? "flex"
                                      : "none"
                                  }
                                  alignItems="center"
                                  overflow="hidden"
                                >
                                  {subMenuTitle}
                                </Text>
                              </NavLink>
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                } else if (type === "title") {
                  return (
                    <Text
                      as={"span"}
                      key={index}
                      className="web-text-xxsmall fw-600 mt-1 text-secondary fw-bold"
                      padding={0}
                    >
                      {title}
                    </Text>
                  );
                } else if (type === "single") {
                  return (
                    <NavLink
                      key={index}
                      style={{ height: "auto", position: "relative" }}
                      className={`${
                        isDrawerOpen || openDrawerClick
                          ? "p-2 web-text-medium"
                          : "p-2 ps-0 web-text-xlarge justify-content-start"
                      } rounded-1 link d-flex align-items-center gap-2 w-100`}
                      to={path}
                    >
                      {Icon && <Icon className="web-text-large ms-2" />}
                      <Text
                        as={"span"}
                        display={
                          isDrawerOpen || openDrawerClick ? "flex" : "none"
                        }
                        alignItems="center"
                        overflow="hidden"
                      >
                        {title}
                      </Text>
                    </NavLink>
                  );
                } else {
                  return null;
                }
              })}
            </Accordion>
          </Box>

          <Button
            colorScheme={"forestGreen"}
            rounded={"lg"}
            // onMouseOver={() => setIsDrawerOpen(true)}
            // onMouseLeave={() => setIsDrawerOpen(false)}
            onClick={openDrawerOnClick}
            style={{
              width: 18,
              height: 26,
              position: "absolute",
              right: 0,
              bottom: 28,
              zIndex: 333,
            }}
          >
            {isDrawerOpen || openDrawerClick ? (
              <ArrowLeftIcon className="web-text-small" />
            ) : (
              <ArrowRightIcon className="web-text-small " />
            )}
          </Button>
        </aside>
      )}

      <main
        className={`h-100   ${slideFromRight ? "pe-3" : "ps-3"}  `}
        style={{
          width: `calc(100% - ${isDrawerOpen || openDrawerClick ? 225 : 74}px)`,
          transition: "width 0.3s ease-in-out",
        }}
      >
        {/* <header className="p-2 ps-0 pt-3 fw-400  border-bottom">
          <span className="fs-5">{getTitle()}</span>
        </header> */}

        <HeaderMain
          slideDirecttion={slideFromRight}
          logOutHandler={logOutHandler}
          icon
          title={getTitle()}
        />

        <AppContent />
      </main>

      {/* =======[ Left ]============ */}

      {slideFromRight ? (
        <aside
          className="h-100 position-relative sideBar  pe-1"
          // onMouseOver={() => setIsDrawerOpen(true)}
          // onMouseLeave={() => setIsDrawerOpen(false)}
          style={{
            width: isDrawerOpen || openDrawerClick ? 225 : 74,
            transition: "width 0.3s ease-in-out", // Smooth transition for width change
            overflow: "hidden", // Hide overflow to prevent content overflow during transition
            backgroundColor: "#0041180A",
            position: "relative",
            // backgroundColor: "#002F0F",
          }}
        >
          <div
            className={`d-flex  ${
              isDrawerOpen || openDrawerClick
                ? "justify-content-end"
                : "justify-content-center"
            }  p-3 pt-3 pb-4 position-relative `}
            height={"10%"}
          >
            {isDrawerOpen || openDrawerClick ? (
              <img
                style={{
                  width: 120,
                }}
                src={logo}
                alt="Logo"
              />
            ) : (
              <img
                style={{
                  width: 30,
                }}
                src={logoMini}
                alt="Logo"
              />
            )}
          </div>

          <Box
            className="ps-2 scroll-bar"
            style={{ height: "80%", overflowY: "scroll", overflowX: "hidden" }}
          >
            <Accordion m={0} allowToggle>
              {nav.map(({ title, type, Icon, submenu, path }, index) => {
                if (type === "accordion") {
                  return (
                    <AccordionItem key={index} border={"none"}>
                      <AccordionButton
                        style={{ height: "auto" }}
                        className={`${
                          isDrawerOpen || openDrawerClick
                            ? "p-2 web-text-medium ps-3 justify-content-between"
                            : "p-2 ps-1 web-text-xlarge justify-content-center"
                        } rounded-1 link d-flex align-items-center gap-2 w-100 mb-1`}
                      >
                        <Box
                          as="span"
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                        >
                          {Icon && <Icon className="web-text-large" />}
                          <Text
                            as={"span"}
                            display={
                              isDrawerOpen || openDrawerClick ? "flex" : "none"
                            }
                            alignItems="center"
                            overflow="hidden"
                          >
                            {title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        p={0}
                        pb={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        {submenu?.map(
                          (
                            { title: subMenuTitle, path: link, icon: SubIcon },
                            i
                          ) => (
                            <Box
                              key={i}
                              style={{ height: "auto", position: "relative" }}
                              className={`${
                                isDrawerOpen || openDrawerClick
                                  ? " web-text-medium ps-4"
                                  : " web-text-xlarge  justify-content-center"
                              }  d-flex align-items-center  p-0`}
                            >
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  width: 2,
                                  left: 20,
                                  height:
                                    i === submenu?.length - 1 ? "55%" : "120%",
                                  borderRadius: "0 0 10px 10px",
                                }}
                              />
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  width: 8,
                                  left: 20,
                                  height: 2,
                                }}
                              />

                              <NavLink
                                className={`${
                                  isDrawerOpen || openDrawerClick
                                    ? "p-2 ps-1 ms-1 web-text-medium "
                                    : "p-2 ps-0 ms-0 zindex-3 ms-4 web-text-xlarge justify-content-center"
                                } rounded-1 link d-flex align-items-center gap-2 w-100 `}
                                to={link}
                              >
                                {SubIcon && (
                                  <SubIcon
                                    className="web-text-large ms-2"
                                    style={{ zIndex: 111 }}
                                  />
                                )}
                                <Text
                                  as={"span"}
                                  display={
                                    isDrawerOpen || openDrawerClick
                                      ? "flex"
                                      : "none"
                                  }
                                  alignItems="center"
                                  overflow="hidden"
                                >
                                  {subMenuTitle}
                                </Text>
                              </NavLink>
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                } else if (type === "title") {
                  return (
                    <Text
                      as={"span"}
                      key={index}
                      className="web-text-xxsmall fw-600 mt-1 text-secondary fw-bold"
                      padding={0}
                    >
                      {title}
                    </Text>
                  );
                } else if (type === "single") {
                  return (
                    <NavLink
                      key={index}
                      style={{ height: "auto", position: "relative" }}
                      className={`${
                        isDrawerOpen || openDrawerClick
                          ? "p-2 web-text-medium"
                          : "p-2 ps-0 web-text-xlarge justify-content-start"
                      } rounded-1 link d-flex align-items-center gap-2 w-100`}
                      to={path}
                    >
                      {Icon && <Icon className="web-text-large ms-2" />}
                      <Text
                        as={"span"}
                        display={
                          isDrawerOpen || openDrawerClick ? "flex" : "none"
                        }
                        alignItems="center"
                        overflow="hidden"
                      >
                        {title}
                      </Text>
                    </NavLink>
                  );
                } else {
                  return null;
                }
              })}
            </Accordion>
          </Box>

          <Button
            colorScheme={"forestGreen"}
            rounded={"lg"}
            // onMouseOver={() => setIsDrawerOpen(true)}
            // onMouseLeave={() => setIsDrawerOpen(false)}
            onClick={openDrawerOnClick}
            style={{
              width: 18,
              height: 26,
              position: "absolute",
              left: 0,
              bottom: 28,
              zIndex: 333,
            }}
          >
            {isDrawerOpen || openDrawerClick ? (
              <ArrowRightIcon className="web-text-small " />
            ) : (
              <ArrowLeftIcon className="web-text-small" />
            )}
          </Button>
        </aside>
      ) : null}
    </Box>
  );
};

export default DashboardLayout;

const AppContent = () => {
  return (
    <Routes>
      {RouteLink.map(({ path, Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
