import React from "react";
import { 
  Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, 
  useColorModeValue, Flex, Badge, Button, Input, InputGroup, InputLeftElement 
} from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { MdDownload, MdSearch } from "react-icons/md";

export default function DasborRestoran() {
  // Neobrutalism Color Palette - inspired by modern fintech design
  const bgPage = "#F5F1E8";
  const cardBg = "#FBF8F3";
  const textDark = "#1A1A1A";
  const textMuted = "#6B7280";
  const accentBlue = "#2563EB";
  const accentYellow = "#F59E0B";
  const accentGreen = "#10B981";
  const accentRed = "#EF4444";
  const accentPurple = "#9333EA";

  const stats = [
    { label: "Pesanan Hari Ini", value: "145", help: "+20%", color: accentBlue },
    { label: "Total Pendapatan", value: "Rp 12,4jt", help: "+15%", color: accentGreen },
    { label: "Meja Terisi", value: "18 / 25", help: "Penuh", color: accentYellow },
    { label: "Staff Bertugas", value: "12", help: "Aktif", color: accentPurple },
  ];

  const salesData = [
    { value: 30, color: accentBlue },
    { value: 50, color: accentYellow },
    { value: 45, color: accentGreen },
    { value: 80, color: accentRed },
    { value: 60, color: accentBlue },
    { value: 90, color: accentYellow },
    { value: 75, color: accentPurple },
  ];

  return (
    <Box bg={bgPage} minH="100vh" pb="60px">
      <PageHeader 
        title="Dasbor Utama" 
        breadcrumb="Dasbor"
      >
        <Flex gap="12px" flexWrap="wrap">
            {/* Enhanced Search Bar */}
            <InputGroup w={{ base: "100%", md: "280px" }}>
                <InputLeftElement pointerEvents="none">
                    <MdSearch color={textMuted} fontSize="20px" />
                </InputLeftElement>
                <Input 
                    placeholder="Cari pesanan..." 
                    bg={cardBg}
                    border="2px solid"
                    borderColor="#E5E7EB"
                    borderRadius="12px"
                    fontSize="15px"
                    fontWeight="600"
                    _focus={{ borderColor: accentBlue, boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)` }}
                    _placeholder={{ color: textMuted }}
                />
            </InputGroup>
            <Button 
                leftIcon={<MdDownload />} 
                bg={accentBlue}
                color="white"
                borderRadius="12px"
                border="none"
                fontSize="14px"
                fontWeight="700"
                display={{ base: "none", md: "flex" }}
                boxShadow="0 4px 12px rgba(37, 99, 235, 0.2)"
                _hover={{ bg: "#1D4ED8", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(37, 99, 235, 0.3)" }}
                transition="all 0.2s"
            >
                Export Laporan
            </Button>
        </Flex>
      </PageHeader>
      
      {/* Stats Grid - 4 Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="32px">
        {stats.map((s, i) => (
          <Box 
            key={i} 
            bg={cardBg}
            border="2px solid"
            borderColor="#E5E7EB"
            borderLeftColor={s.color}
            borderLeftWidth="6px"
            p="24px"
            borderRadius="12px"
            position="relative"
            overflow="hidden"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: `0 12px 24px rgba(${parseInt(s.color.slice(1,3),16)}, ${parseInt(s.color.slice(3,5),16)}, ${parseInt(s.color.slice(5,7),16)}, 0.15)`,
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _before={{
              content: '""',
              position: "absolute",
              top: "0",
              right: "0",
              width: "60px",
              height: "60px",
              bg: s.color,
              opacity: "0.08",
              borderRadius: "50%",
            }}
          >
            <Text 
              fontSize="11px" 
              fontWeight="800" 
              textTransform="uppercase"
              letterSpacing="1.5px"
              color={textMuted}
              mb="12px"
            >
              {s.label}
            </Text>
            <Text 
              fontSize="40px" 
              fontWeight="900"
              color={textDark}
              lineHeight="1"
              mb="12px"
            >
              {s.value}
            </Text>
            <Flex align="center" gap="6px">
              <Box w="8px" h="8px" bg={s.color} borderRadius="50%" />
              <Text 
                fontSize="13px" 
                fontWeight="700"
                color={s.color}
              >
                {s.help}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      {/* Sales Chart & Maps Grid */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="24px" mb="32px">
        {/* Sales Chart */}
        <Box 
          bg={cardBg}
          border="2px solid"
          borderColor="#E5E7EB"
          p="28px"
          borderRadius="12px"
          boxShadow="0 2px 8px rgba(0,0,0,0.06)"
          _hover={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          }}
          transition="all 0.2s"
        >
          <Text 
            fontSize="18px" 
            fontWeight="900" 
            color={textDark} 
            mb="24px"
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            📊 Penjualan Mingguan
          </Text>
          <Flex h="220px" align="flex-end" gap="8px">
            {salesData.map((item, i) => (
              <Box 
                key={i} 
                flex="1" 
                bg={item.color}
                h={`${item.value}%`}
                borderRadius="6px 6px 0 0"
                transition="all 0.3s"
                _hover={{ opacity: 0.8, transform: "scaleY(1.08)" }}
                cursor="pointer"
                boxShadow={`0 4px 12px rgba(${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}, 0.25)`}
              />
            ))}
          </Flex>
          <Flex justify="space-between" mt="20px">
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(day => (
              <Text 
                key={day} 
                fontSize="12px" 
                color={textMuted}
                fontWeight="700"
                w="100%" 
                textAlign="center"
              >
                {day}
              </Text>
            ))}
          </Flex>
        </Box>

        {/* Google Maps */}
        <Box 
          bg={cardBg}
          border="2px solid"
          borderColor="#E5E7EB"
          borderRadius="12px"
          overflow="hidden"
          boxShadow="0 2px 8px rgba(0,0,0,0.06)"
          _hover={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          }}
          transition="all 0.2s"
        >
           <Box p="28px" pb="16px" borderBottom="2px solid" borderColor="#E5E7EB">
                <Text 
                  fontSize="18px" 
                  fontWeight="900" 
                  color={textDark}
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                    📍 Lokasi Resto
                </Text>
                <Text 
                  color={textMuted} 
                  fontSize="13px"
                  fontWeight="600"
                  mt="8px"
                >
                  Cabang Utama Jakarta Selatan
                </Text>
           </Box>
           <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.1748281134!2d106.824964!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4a42903ab%3A0x62810d7a04944f6!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1714000000000!5m2!1sen!2sid" 
                width="100%" 
                height="280" 
                style={{ border: "none" }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
           </iframe>
        </Box>
      </SimpleGrid>

      {/* Integration Box */}
      <Box 
        bg={cardBg}
        border="2px solid"
        borderColor={accentYellow}
        borderLeftWidth="6px"
        borderLeftColor={accentYellow}
        p="28px"
        borderRadius="12px"
        boxShadow="0 4px 12px rgba(245, 158, 11, 0.15)"
        position="relative"
        overflow="hidden"
        _hover={{
          boxShadow: "0 8px 24px rgba(245, 158, 11, 0.25)",
          transform: "translateY(-2px)",
        }}
        transition="all 0.2s"
      >
          <Box 
            position="absolute"
            top="0"
            right="0"
            width="80px"
            height="80px"
            bg={accentYellow}
            opacity="0.08"
            borderRadius="50%"
          />
          <Text 
            fontSize="18px" 
            fontWeight="900" 
            color={textDark}
            mb="12px"
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            ⚡ Sistem Terintegrasi
          </Text>
          <Text 
            color={textMuted}
            mb="16px"
            fontSize="15px"
            fontWeight="500"
            lineHeight="1.6"
          >
            Sistem dengan <b style={{ fontWeight: "900", color: textDark }}>Google Cloud</b> dan <b style={{ fontWeight: "900", color: textDark }}>Maps API</b> untuk akurasi lokasi & performa optimal.
          </Text>
          <Box mt="16px">
            <Badge 
              bg={accentYellow}
              color="#1A1A1A"
              p="10px 16px" 
              borderRadius="8px"
              fontSize="12px"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="1px"
              boxShadow="0 4px 12px rgba(245, 158, 11, 0.2)"
            >
              ✓ API Status: Stabil
            </Badge>
          </Box>
      </Box>
    </Box>
  );
}
