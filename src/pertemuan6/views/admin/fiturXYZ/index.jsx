import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card";

export default function FiturXYZ() {
  const bgPage = useColorModeValue("#F8FAFC", "#0F172A");
  const textColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("white", "navy.700");

  return (
    <Box minH="100vh" bg={bgPage} p="40px">
      <Text fontSize="3xl" fontWeight="bold" color={textColor} mb="20px">
        Fitur XYZ
      </Text>
      <Text fontSize="lg" color={textColor} mb="30px">
        Halaman Fitur XYZ siap untuk dikembangkan lebih lanjut
      </Text>

      {/* Horizon UI Card */}
      <Card bg={cardBg} p="20px" borderRadius="lg">
        <Text fontSize="xl" fontWeight="semibold" color={textColor} mb="15px">
          Overview Fitur
        </Text>
        <Text color={textColor} fontSize="md" lineHeight="tall">
          Komponen Horizon UI sudah berhasil diintegrasikan. Kamu bisa mulai 
          menambahkan tabel, chart, form, atau konten lainnya di dalam card ini.
        </Text>
      </Card>
    </Box>
  );
}