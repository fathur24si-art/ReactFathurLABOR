import React from "react";
import { Box, Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PageHeader = ({ title, breadcrumb, children }) => {
  const textColor = "#1A1A1A";
  const subTextColor = "#6B7280";
  const accentColor = "#2563EB";

  const breadcrumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <Box mb="40px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction="column">
        <Breadcrumb 
          separator={<ChevronRightIcon color={subTextColor} />} 
          spacing="6px" 
          mb="16px"
        >
          <BreadcrumbItem color={subTextColor} fontSize="11px" fontWeight="700" textTransform="uppercase" letterSpacing="1px">
            <BreadcrumbLink href="#">Resto Rustaf</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem 
              key={index} 
              color={index === breadcrumbs.length - 1 ? accentColor : subTextColor} 
              fontSize="11px" 
              fontWeight={index === breadcrumbs.length - 1 ? "800" : "700"}
              textTransform="uppercase"
              letterSpacing="1px"
            >
              <BreadcrumbLink href="#">{item}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap="16px">
          <Box>
            <Text 
              color={textColor} 
              fontSize={{ base: "36px", md: "52px", xl: "64px" }} 
              fontWeight="900"
              lineHeight="1.1"
              letterSpacing="-1px"
            >
              {title}
            </Text>
            <Box 
              h="3px" 
              bg={accentColor}
              mt="14px"
              w={{ base: "60px", md: "80px" }}
            />
          </Box>
          {children && <Box>{children}</Box>}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PageHeader;
