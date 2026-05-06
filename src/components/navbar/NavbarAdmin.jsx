import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const { secondary, message, brandText } = props;

  useEffect(() => {
    const changeNavbar = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  const mainText = useColorModeValue("gray.900", "white");
  const secondaryText = useColorModeValue("gray.500", "gray.300");

  const navbarBg = useColorModeValue(
    scrolled ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.62)",
    scrolled ? "rgba(15,23,42,0.86)" : "rgba(15,23,42,0.62)"
  );

  const borderColor = useColorModeValue(
    "rgba(226,232,240,0.9)",
    "rgba(255,255,255,0.12)"
  );

  const shadow = scrolled
    ? "0 20px 50px rgba(15, 23, 42, 0.12)"
    : "0 10px 30px rgba(15, 23, 42, 0.06)";

  return (
    <Box
      position="fixed"
      bg={navbarBg}
      backdropFilter="blur(24px)"
      borderRadius="28px"
      border="1px solid"
      borderColor={borderColor}
      boxShadow={shadow}
      transition="all .25s ease"
      minH="82px"
      mx="auto"
      px={{ base: "16px", md: "20px" }}
      py="12px"
      right={{ base: "12px", md: "30px", xl: "30px" }}
      top={{ base: "12px", md: "20px" }}
      w={{
        base: "calc(100vw - 24px)",
        md: "calc(100vw - 60px)",
        xl: "calc(100vw - 380px)",
        "2xl": "calc(100vw - 395px)",
      }}
      zIndex="999"
    >
      <Flex
        w="100%"
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "stretch", md: "center" }}
        gap={{ base: "12px", md: "0" }}
      >
        <Box>
          <Breadcrumb>
            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="900"
            fontSize={{ base: "26px", md: "34px" }}
            lineHeight="1.1"
            _hover={{ textDecoration: "none", color: "orange.500" }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{ boxShadow: "none" }}
          >
            {brandText}
          </Link>
        </Box>

        <Box ms={{ md: "auto" }} w={{ base: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>

      {secondary ? (
        <Text color="white" mt="8px">
          {message}
        </Text>
      ) : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};