import React from "react";
import {
  Box,
  Flex,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PageHeader = ({ title, breadcrumb, children }) => {
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.72)",
    "rgba(15,23,42,0.72)"
  );
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  const breadcrumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <Box mb="28px" pt={{ base: "128px", md: "104px", xl: "112px" }}>
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="34px"
        p={{ base: "22px", md: "30px" }}
        boxShadow="0 20px 50px rgba(15,23,42,0.08)"
        backdropFilter="blur(22px)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-55px"
          top="-55px"
          w="180px"
          h="180px"
          borderRadius="full"
          bg="orange.300"
          opacity="0.14"
        />

        <Flex direction="column" position="relative" zIndex="1">
          <Breadcrumb
            separator={<ChevronRightIcon color={subTextColor} />}
            spacing="6px"
            mb="14px"
          >
            <BreadcrumbItem
              color={subTextColor}
              fontSize="xs"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              <BreadcrumbLink href="#">Resto Rustaf</BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem
                key={index}
                color={
                  index === breadcrumbs.length - 1
                    ? "orange.400"
                    : subTextColor
                }
                fontSize="xs"
                fontWeight={index === breadcrumbs.length - 1 ? "900" : "800"}
                textTransform="uppercase"
                letterSpacing="1px"
              >
                <BreadcrumbLink href="#">{item}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>

          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap="18px"
          >
            <Box>
              <Text
                color={textColor}
                fontSize={{ base: "34px", md: "44px", xl: "52px" }}
                fontWeight="900"
                lineHeight="1.05"
                letterSpacing="-1.4px"
              >
                {title}
              </Text>

              <Flex align="center" gap="8px" mt="14px">
                <Box h="8px" w="8px" borderRadius="full" bg="orange.400" />
                <Box h="4px" w="76px" borderRadius="full" bg="orange.400" />
              </Flex>
            </Box>

            {children && (
              <Box w={{ base: "100%", md: "auto" }}>
                {children}
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PageHeader;