/* eslint-disable */
import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarItem from "./SidebarItem.jsx";

export function SidebarLinks(props) {
  const location = useLocation();
  const { routes } = props;
  const inactiveColor = useColorModeValue("gray.600", "gray.300");

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <Box key={index}>
            <Text
              fontSize="sm"
              color={inactiveColor}
              fontWeight="800"
              px="16px"
              pt="18px"
              pb="10px"
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </Box>
        );
      }

      return (
        <SidebarItem
          key={index}
          route={route}
          isActive={activeRoute(route.path.toLowerCase())}
        />
      );
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;