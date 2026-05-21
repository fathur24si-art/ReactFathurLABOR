import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { SearchBar } from "./searchBar/SearchBar.jsx";
import { SidebarResponsive } from "components/sidebar";
import PropTypes from "prop-types";
import React from "react";
import { MdNotificationsNone } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import routes from "../../routes.jsx";
import { useNavigate } from "react-router-dom";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.9)",
    "rgba(15,23,42,0.92)"
  );
  const iconBg = useColorModeValue("orange.50", "whiteAlpha.100");
  const iconColor = useColorModeValue("orange.500", "orange.300");
  const textColor = useColorModeValue("gray.900", "white");
  const mutedText = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  const shadow = useColorModeValue(
    "0 16px 40px rgba(15, 23, 42, 0.08)",
    "0 16px 40px rgba(0, 0, 0, 0.28)"
  );

  const handleLogout = () => {
    navigate("/pertemuan-7/login");
  };

  return (
    <Flex
      w={{ base: "100%", md: "auto" }}
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      flexDirection="row"
      bg={cardBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "nowrap"}
      p="8px"
      borderRadius="24px"
      border="1px solid"
      borderColor={borderColor}
      boxShadow={shadow}
      gap="8px"
    >
      <Box flex={{ base: "1", md: "unset" }} minW={{ base: "0", md: "240px" }}>
        <SearchBar
          mb={secondary ? { base: "10px", md: "unset" } : "unset"}
          me={{ base: "0", md: "4px" }}
          borderRadius="20px"
        />
      </Box>

      <SidebarResponsive routes={routes} />

      <Menu>
        <MenuButton
          as={Button}
          minW="44px"
          h="44px"
          p="0"
          borderRadius="18px"
          bg={iconBg}
          _hover={{ bg: "orange.100", transform: "translateY(-1px)" }}
          _active={{ bg: iconBg }}
        >
          <Icon
            as={MdNotificationsNone}
            color={iconColor}
            w="22px"
            h="22px"
          />
        </MenuButton>

        <MenuList
          boxShadow={shadow}
          p="18px"
          borderRadius="24px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          mt="14px"
          minW={{ base: "280px", md: "320px" }}
          zIndex="1000"
        >
          <Flex
            p="14px"
            borderRadius="20px"
            bg={useColorModeValue("orange.50", "whiteAlpha.100")}
            direction="column"
          >
            <Text fontSize="md" fontWeight="800" color={textColor} mb="4px">
              Notifikasi
            </Text>
            <Text fontSize="sm" color={mutedText}>
              Tidak ada notifikasi baru.
            </Text>
          </Flex>
        </MenuList>
      </Menu>

      <Button
        minW="44px"
        h="44px"
        p="0"
        borderRadius="18px"
        bg={iconBg}
        onClick={toggleColorMode}
        _hover={{ bg: "orange.100", transform: "translateY(-1px)" }}
        _active={{ bg: iconBg }}
      >
        <Icon
          h="22px"
          w="22px"
          color={iconColor}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>

      <Menu>
        <MenuButton>
          <Flex
            align="center"
            gap="10px"
            p="5px"
            pe={{ base: "5px", md: "12px" }}
            borderRadius="20px"
            bg={useColorModeValue("gray.50", "whiteAlpha.100")}
            _hover={{ cursor: "pointer", bg: iconBg }}
          >
            <Avatar
              color="white"
              name="Admin User"
              bg="linear-gradient(135deg, #fb923c 0%, #ea580c 100%)"
              size="sm"
              w="40px"
              h="40px"
            />

            <Box display={{ base: "none", md: "block" }} textAlign="left">
              <Text fontSize="sm" fontWeight="800" color={textColor} lineHeight="1">
                Admin
              </Text>
              <Text fontSize="xs" color={mutedText}>
                Online
              </Text>
            </Box>
          </Flex>
        </MenuButton>

        <MenuList
          boxShadow={shadow}
          p="10px"
          mt="12px"
          borderRadius="24px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          zIndex="1000"
        >
          <Box
            px="14px"
            py="12px"
            mb="8px"
            borderRadius="18px"
            bg={useColorModeValue("orange.50", "whiteAlpha.100")}
          >
            <Text fontSize="sm" fontWeight="800" color={textColor}>
              👋 Halo, Admin!
            </Text>
            <Text fontSize="xs" color={mutedText}>
              Selamat datang kembali
            </Text>
          </Box>

          <MenuItem
            borderRadius="16px"
            px="14px"
            py="10px"
            _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
            _focus={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
          >
            <Text fontSize="sm">Pengaturan Profil</Text>
          </MenuItem>

          <MenuItem
            borderRadius="16px"
            px="14px"
            py="10px"
            color="red.400"
            onClick={handleLogout}
            _hover={{ bg: "red.50" }}
            _focus={{ bg: "red.50" }}
          >
            <Text fontSize="sm" fontWeight="700">
              Keluar
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};