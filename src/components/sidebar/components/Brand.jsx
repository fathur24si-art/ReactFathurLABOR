import React from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

export function SidebarBrand() {
  const cardBg = useColorModeValue(
    "linear-gradient(135deg, #fff7ed 0%, #ffedd5 45%, #fed7aa 100%)",
    "linear-gradient(135deg, #431407 0%, #7c2d12 55%, #9a3412 100%)"
  );

  const textColor = useColorModeValue("gray.900", "white");
  const subColor = useColorModeValue("orange.700", "orange.100");

  return (
    <Box px="16px" mb="22px">
      <Flex
        direction="column"
        justify="space-between"
        minH="150px"
        p="22px"
        borderRadius="28px"
        bg={cardBg}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-35px"
          top="-35px"
          w="110px"
          h="110px"
          borderRadius="full"
          bg="whiteAlpha.500"
        />

        <Box>
          <Badge
            bg="whiteAlpha.700"
            color={subColor}
            borderRadius="full"
            px="10px"
            py="4px"
            mb="16px"
          >
            Admin Panel
          </Badge>

          <Text
            fontSize="2xl"
            fontWeight="900"
            color={textColor}
            lineHeight="1"
            fontFamily="Poppins"
          >
            RESTO
          </Text>

          <Text
            fontSize="3xl"
            fontWeight="900"
            color="orange.500"
            lineHeight="1.1"
            fontFamily="Poppins"
          >
            RUSTAF
          </Text>
        </Box>

        <Text fontSize="sm" color={subColor} fontWeight="600">
          Restaurant Management
        </Text>
      </Flex>
    </Box>
  );
}

export default SidebarBrand;