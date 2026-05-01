// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.jsx';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.jsx';
import Sidebar from 'components/sidebar/Sidebar.jsx';
import { SidebarContext } from 'contexts/SidebarContext.jsx';
import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes, { errorRoutes } from 'routes.jsx';
import ErrorBoundary from 'components/error/ErrorBoundary.jsx';

export default function Dashboard(props) {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation();
  
  const allRoutes = [...routes, ...errorRoutes];

  // Improved more precise route detection
  const getActiveRoute = (routesList) => {
    let activeRoute = 'Dashboard';
    for (let i = 0; i < routesList.length; i++) {
        const fullPath = routesList[i].layout + routesList[i].path;
        // Check if the current pathname matches the route path
        // For dynamic routes like /error/:code, we check if it starts with the base path
        if (routesList[i].path.includes(':')) {
            const basePath = fullPath.split(':')[0];
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
      if (route.layout === '/admin') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      return null;
    });
  };

  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Resto Rustaf'}
                  brandText={getActiveRoute(allRoutes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            <Box
              mx="auto"
              p={{ base: '20px', md: '30px' }}
              pe="20px"
              minH="100vh"
              pt="50px"
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
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
