import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box minH="100vh" bg="gray.50" color="gray.800">
      <Flex direction="column" maxW="1200px" mx="auto" p={{ base: "4", md: "8" }} minH="100vh">
        {/* Header Dashboard */}
        <Box
          mb="8"
          p="6"
          bg="white"
          borderRadius="2xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <VStack align="start" spacing="2">
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="orange.500">
              Admin Resto
            </Text>
            <Heading as="h1" size="xl" color="navy.800" fontWeight="bold">
              Dashboard Admin Resto
            </Heading>
            <Text color="gray.500" fontSize="md" maxW="2xl">
              Kelola menu, pesanan, dan pelanggan dengan tampilan yang rapi dan mudah dinavigasi.
            </Text>
          </VStack>
        </Box>


        <Box flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
