import { Portal, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.jsx";
import Navbar from "components/navbar/NavbarAdmin.jsx";
import Sidebar from "components/sidebar/Sidebar.jsx";
import { SidebarContext } from "contexts/SidebarContext.jsx";
import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import routes, { errorRoutes } from "../../../routes.jsx";
import ErrorBoundary from "components/error/ErrorBoundary.jsx";

export default function Dashboard(props) {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation();

  const allRoutes = [...routes, ...errorRoutes];

  const bgPage = useColorModeValue("#F8FAFC", "#0F172A");
  const bgSoft = useColorModeValue(
    "radial-gradient(circle at top right, rgba(251,146,60,0.16), transparent 34%), radial-gradient(circle at bottom left, rgba(59,130,246,0.12), transparent 32%), #F8FAFC",
    "radial-gradient(circle at top right, rgba(251,146,60,0.14), transparent 34%), radial-gradient(circle at bottom left, rgba(59,130,246,0.12), transparent 32%), #0F172A"
  );

  const getActiveRoute = (routesList) => {
    let activeRoute = "Dashboard";

    for (let i = 0; i < routesList.length; i++) {
      const fullPath = routesList[i].layout + routesList[i].path;

      if (routesList[i].path.includes(":")) {
        const basePath = fullPath.split(":")[0];

        if (location.pathname.startsWith(basePath)) {
          return routesList[i].name;
        }
      } else if (location.pathname === fullPath) {
        return routesList[i].name;
      }
    }

    return activeRoute;
  };

  const getRoutes = (routesList) => {
    return routesList.map((route, key) => {
      if (route.layout === "/admin") {
        return <Route path={`${route.path}`} element={route.component} key={key} />;
      }

      return null;
    });
  };

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();

  return (
    <Box bg={bgPage} minH="100vh">
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />

        <Box
          minH="100vh"
          position="relative"
          overflow="hidden"
          bg={bgSoft}
          float={{ base: "none", xl: "right" }}
          w={{ base: "100%", xl: "calc(100% - 336px)" }}
          maxW={{ base: "100%", xl: "calc(100% - 336px)" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        >
          <Portal>
            <Navbar
              onOpen={onOpen}
              logoText="Resto Rustaf"
              brandText={getActiveRoute(allRoutes)}
              fixed={fixed}
              {...rest}
            />
          </Portal>

          <Box
            mx="auto"
            px={{ base: "16px", md: "24px", xl: "30px" }}
            pb="40px"
            minH="100vh"
            position="relative"
            zIndex="1"
          >
            <ErrorBoundary>
              <Routes>
                {getRoutes(allRoutes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/beranda" replace />}
                />

                <Route
                  path="*"
                  element={<Navigate to="/admin/error/404" replace />}
                />
              </Routes>
            </ErrorBoundary>
          </Box>

          <Box px={{ base: "16px", md: "24px", xl: "30px" }} pb="20px">
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}