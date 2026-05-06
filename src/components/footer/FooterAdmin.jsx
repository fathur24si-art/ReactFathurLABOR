import React from "react";
import {
  Flex,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  const textColor = useColorModeValue("gray.600", "gray.300");

  const bgCard = useColorModeValue(
    "rgba(255,255,255,0.75)",
    "rgba(15,23,42,0.72)"
  );

  const borderColor = useColorModeValue(
    "rgba(226,232,240,0.9)",
    "rgba(255,255,255,0.08)"
  );

  return (
    <Box
      mt="20px"
      mb="10px"
      px={{ base: "16px", md: "24px" }}
    >
      <Flex
        bg={bgCard}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="28px"
        px={{ base: "20px", md: "28px" }}
        py="18px"
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="12px"
        boxShadow="0 18px 40px rgba(15,23,42,0.06)"
      >
        <Box>
          <Text
            fontSize="sm"
            fontWeight="800"
            color="orange.400"
            mb="2px"
          >
            RESTO RUSTAF
          </Text>

          <Text
            fontSize="xs"
            color={textColor}
            fontWeight="600"
          >
            Dashboard Management System
          </Text>
        </Box>

        <Text
          color={textColor}
          textAlign="center"
          fontSize="sm"
          fontWeight="700"
        >
          © {new Date().getFullYear()} Resto Rustaf. All Rights Reserved.
        </Text>
      </Flex>
    </Box>
  );
}