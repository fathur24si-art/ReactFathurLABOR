import React from "react";
import { 
  Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, 
  useColorModeValue, Flex, Badge, Button, Input, InputGroup, InputLeftElement 
} from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { MdDownload, MdSearch } from "react-icons/md";

export default function DasborRestoran() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const bgSearch = useColorModeValue("secondaryGray.300", "whiteAlpha.200");

  const stats = [
    { label: "Pesanan Hari Ini", value: "145", help: "+20% dari kemarin" },
    { label: "Total Pendapatan", value: "Rp 12,4jt", help: "+15% minggu ini" },
    { label: "Meja Terisi", value: "18 / 25", help: "Jam sibuk" },
    { label: "Staff Bertugas", value: "12", help: "Shift Pagi" },
  ];

  const salesData = [30, 50, 45, 80, 60, 90, 75];

  return (
    <Box>
      <PageHeader 
        title="Dasbor Utama" 
        breadcrumb="Dasbor"
      >
        <Flex gap="10px">
            {/* Google Style Search Bar */}
            <InputGroup w={{ base: "100%", md: "300px" }}>
                <InputLeftElement pointerEvents="none">
                    <MdSearch color="gray.400" />
                </InputLeftElement>
                <Input 
                    variant="filled" 
                    placeholder="Telusuri data..." 
                    bg={bgSearch} 
                    borderRadius="15px"
                    _focus={{ borderColor: "brand.400", bg: bgSearch }}
                />
            </InputGroup>
            <Button leftIcon={<MdDownload />} variant="brand" borderRadius="70px" display={{ base: "none", md: "flex" }}>
                Laporan
            </Button>
        </Flex>
      </PageHeader>
      
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
        {stats.map((s, i) => (
          <Card key={i} p="20px">
            <Stat>
              <StatLabel color={subTextColor}>{s.label}</StatLabel>
              <StatNumber color={textColor} fontSize="2xl">{s.value}</StatNumber>
              <StatHelpText color="green.400">{s.help}</StatHelpText>
            </Stat>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="20px" mb="20px">
        <Card p="30px">
          <Text fontSize="xl" fontWeight="600" color={textColor} mb="20px">
            Grafik Penjualan Mingguan
          </Text>
          <Flex h="200px" align="flex-end" gap="10px">
            {salesData.map((h, i) => (
              <Box 
                key={i} 
                flex="1" 
                bg="brand.500" 
                h={`${h}%`} 
                borderRadius="8px 8px 0 0"
                transition="0.3s"
                _hover={{ bg: "brand.400" }}
              />
            ))}
          </Flex>
          <Flex justify="space-between" mt="10px">
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(day => (
              <Text key={day} fontSize="xs" color={subTextColor} w="100%" textAlign="center">{day}</Text>
            ))}
          </Flex>
        </Card>

        {/* Integration Component: Google Maps */}
        <Card p="0px" overflow="hidden">
           <Box p="30px" pb="15px">
                <Text fontSize="xl" fontWeight="600" color={textColor}>
                    Lokasi Resto Rustaf (Google Maps)
                </Text>
                <Text color={subTextColor} fontSize="sm">Cabang Utama Jakarta Selatan</Text>
           </Box>
           <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.1748281134!2d106.824964!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4a42903ab%3A0x62810d7a04944f6!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1714000000000!5m2!1sen!2sid" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
           </iframe>
        </Card>
      </SimpleGrid>

      <Card p="30px">
          <Text fontSize="xl" fontWeight="600" color={textColor} mb="15px">
            Manajemen Resto Rustaf
          </Text>
          <Text color={subTextColor} mb="10px">
            Sistem terintegrasi dengan <b>Google Cloud</b> dan <b>Maps API</b> untuk memastikan akurasi data lokasi dan performa sistem yang optimal.
          </Text>
          <Box mt="20px">
            <Badge colorScheme="green" p="10px 15px" borderRadius="10px">Koneksi API Google: Stabil</Badge>
          </Box>
      </Card>
    </Box>
  );
}
