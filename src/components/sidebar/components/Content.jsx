import React from "react";
import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Brand from "./Brand.jsx";
import Links from "./Links.jsx";

function SidebarContent(props) {
  const { routes } = props;
  const sectionColor = useColorModeValue("gray.400", "gray.500");

  return (
    <Flex direction="column" height="100%" pt="18px" px="8px">
      <Brand />

      <Box px="18px" mb="10px">
        <Text
          fontSize="xs"
          fontWeight="800"
          color={sectionColor}
          letterSpacing="1px"
          textTransform="uppercase"
        >
          Menu Utama
        </Text>
      </Box>

      <Stack direction="column" spacing="8px" mb="auto">
        <Box px="10px">
          <Links routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;