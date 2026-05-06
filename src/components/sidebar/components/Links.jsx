/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export function SidebarLinks(props) {
  const location = useLocation();
  const { routes } = props;

  const activeBg = useColorModeValue(
    "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
  );

  const inactiveBg = useColorModeValue("white", "whiteAlpha.100");
  const hoverBg = useColorModeValue("orange.50", "whiteAlpha.200");
  const activeColor = "white";
  const inactiveColor = useColorModeValue("gray.600", "gray.300");
  const iconInactive = useColorModeValue("orange.400", "orange.300");
  const shadowActive = "0 16px 35px rgba(249, 115, 22, 0.35)";

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

      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        const isActive = activeRoute(route.path.toLowerCase());

        return (
          <NavLink key={index} to={route.layout + route.path}>
            <Box
              mb="8px"
              p="6px"
              borderRadius="22px"
              bg={isActive ? activeBg : inactiveBg}
              boxShadow={isActive ? shadowActive : "none"}
              transition="all .25s ease"
              _hover={{
                transform: "translateY(-2px)",
                bg: isActive ? activeBg : hoverBg,
              }}
            >
              <HStack spacing="14px" py="10px" px="12px">
                {route.icon && (
                  <Flex
                    w="38px"
                    h="38px"
                    align="center"
                    justify="center"
                    borderRadius="16px"
                    bg={isActive ? "whiteAlpha.300" : "orange.50"}
                    color={isActive ? activeColor : iconInactive}
                    fontSize="18px"
                  >
                    {route.icon}
                  </Flex>
                )}

                <Text
                  fontSize="sm"
                  fontWeight={isActive ? "800" : "600"}
                  color={isActive ? activeColor : inactiveColor}
                >
                  {route.name}
                </Text>
              </HStack>
            </Box>
          </NavLink>
        );
      }

      return null;
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;