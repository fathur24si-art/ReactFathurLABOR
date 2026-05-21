import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/sidebar";
import AdminNavbar from "components/navbar/NavbarAdmin";
import routes from "../routes";

const MainLayout = () => {
  return (
    <Box minH="100vh" bg="gray.50">

      <Sidebar routes={routes} />
      <Box
        float="right"
        minH="100vh"
        w={{ base: "100%", xl: "calc(100% - 300px)" }}
        maxW={{ base: "100%", xl: "calc(100% - 300px)" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        overflow="auto"
        position="relative"
        zIndex="1"
      >

        <AdminNavbar brandText="Dashboard Admin Resto" />
        <Box mx="auto" p={{ base: "20px", md: "30px" }} pe="20px" pt="100px">

          <Outlet />
        </Box>
      </Box>
    </Box>
  );

};

export default MainLayout;
