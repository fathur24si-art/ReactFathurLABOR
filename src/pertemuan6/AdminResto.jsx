import React from "react";
import { Box, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";

const AdminResto = () => {
  return (
    <Box
      bg="white"
      p={{ base: "6", md: "8" }}
      borderRadius="2xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack spacing="6" align="stretch">
        <Box bg="orange.50" p="6" borderRadius="xl">
          <Heading as="h2" size="md" color="navy.800" mb="2">
            Ringkasan Hari Ini
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Sekilas data pesanan, pendapatan, dan pelanggan akan ditampilkan di sini.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
          <Box bg="gray.50" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100">
            <Heading as="h3" size="sm" color="navy.800" mb="2">
              Pesanan Terbaru
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Lihat dan kelola pesanan masuk dengan mudah.
            </Text>
          </Box>
          <Box bg="gray.50" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100">
            <Heading as="h3" size="sm" color="navy.800" mb="2">
              Data Pelanggan
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Kelola daftar pelanggan dan histori pesanan.
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default AdminResto;
