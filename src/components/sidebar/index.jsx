import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "./components/Content.jsx";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "../scrollbar/Scrollbar.jsx";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
import { IoMenuOutline } from "react-icons/io5";

function Sidebar(props) {
  const { routes } = props;

  const sidebarBg = useColorModeValue(
    "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    "linear-gradient(180deg, #111827 0%, #0f172a 100%)"
  );

  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const shadow = useColorModeValue(
    "0 24px 60px rgba(15, 23, 42, 0.08)",
    "0 24px 60px rgba(0, 0, 0, 0.35)"
  );

  return (
    <Box
      display={{ sm: "none", xl: "block" }}
      position="fixed"
      minH="100%"
      p="18px"
      zIndex="10"
    >
      <Box
        bg={sidebarBg}
        w="300px"
        h="calc(100vh - 36px)"
        borderRadius="30px"
        overflowX="hidden"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props) {
  const { routes } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const sidebarBg = useColorModeValue("#ffffff", "#0f172a");
  const menuBg = useColorModeValue("white", "whiteAlpha.100");
  const menuColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex
        ref={btnRef}
        onClick={onOpen}
        w="42px"
        h="42px"
        align="center"
        justify="center"
        bg={menuBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="16px"
        boxShadow="0 10px 25px rgba(15, 23, 42, 0.08)"
      >
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          w="24px"
          h="24px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="300px"
          maxW="300px"
          bg={sidebarBg}
          borderRightRadius="30px"
        >
          <DrawerCloseButton
            zIndex="3"
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="300px" px="0" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;