import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      zIndex='3'
      flexDirection={{ base: "column", xl: "row" }}
      alignItems={{ base: "center", xl: "start" }}
      justifyContent='center'
      px={{ base: "30px", md: "50px" }}
      pb='30px'
    >
      <Text color={textColor} textAlign="center">
        &copy; {1900 + new Date().getYear()} Dashboard Admin. All Rights Reserved.
      </Text>
    </Flex>
  );
}
