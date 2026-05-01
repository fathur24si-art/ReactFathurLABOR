import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator.jsx";

export function SidebarBrand() {
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text
        fontSize="3xl"
        fontWeight="800"
        color={logoColor}
        my="32px"
        fontFamily="Poppins"
      >
        RESTO <Text as="span" color="brand.500">RUSTAF</Text>
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
