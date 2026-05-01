import React from "react";
import { Box, Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorModeValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PageHeader = ({ title, breadcrumb, children }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  const breadcrumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <Box mb="30px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction="column">
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} spacing="8px" mb="10px">
          <BreadcrumbItem color={subTextColor} fontSize="sm">
            <BreadcrumbLink href="#">Resto Rustaf</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem key={index} color={index === breadcrumbs.length - 1 ? textColor : subTextColor} fontSize="sm" fontWeight={index === breadcrumbs.length - 1 ? "bold" : "normal"}>
              <BreadcrumbLink href="#">{item}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Flex justify="space-between" align="center" wrap="wrap" gap="4">
          <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700">
            {title}
          </Text>
          {children && <Box>{children}</Box>}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PageHeader;
