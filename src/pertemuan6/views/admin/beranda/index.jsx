import React, { useState, useMemo } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { MdDownload, MdSearch, MdRestaurant, MdTableBar, MdGroups, MdTrendingUp, MdCalendarToday, MdDateRange } from "react-icons/md";

export default function DasborRestoran() {
  const bgPage = useColorModeValue("#F8FAFC", "#0F172A");
  const cardBg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(15,23,42,0.85)");
  const textDark = useColorModeValue("gray.900", "white");
  const textMuted = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const tooltipBg = useColorModeValue("gray.900", "white");
  const tooltipColor = useColorModeValue("white", "gray.900");

  const [period, setPeriod] = useState("week"); 
  const [hoveredBar, setHoveredBar] = useState(null);

  // Functional sales data with state
  const [salesData, setSalesData] = useState({
    week: [
      { day: "Sen", value: 42, orders: 45, revenue: 2100000 },
      { day: "Sel", value: 68, orders: 72, revenue: 3600000 },
      { day: "Rab", value: 55, orders: 58, revenue: 2900000 },
      { day: "Kam", value: 88, orders: 92, revenue: 4600000 },
      { day: "Jum", value: 73, orders: 76, revenue: 3800000 },
      { day: "Sab", value: 96, orders: 98, revenue: 5200000 },
      { day: "Min", value: 80, orders: 82, revenue: 4100000 },
    ],
    month: [
      { day: "M1", value: 65, orders: 68, revenue: 3400000 },
      { day: "M2", value: 72, orders: 75, revenue: 3750000 },
      { day: "M3", value: 58, orders: 60, revenue: 3000000 },
      { day: "M4", value: 85, orders: 88, revenue: 4400000 },
    ],
  });

  const currentData = salesData[period];

  // Calculate stats from sales data
  const stats = useMemo(() => {
    const today = currentData[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    const totalRevenue = currentData.reduce((acc, item) => acc + item.revenue, 0);
    const totalOrders = currentData.reduce((acc, item) => acc + item.orders, 0);
    const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return [
      { label: "Pesanan Hari Ini", value: today?.orders?.toString() || "145", help: "+20% dari kemarin", color: "orange.400", icon: MdRestaurant },
      { label: "Total Pendapatan", value: `Rp ${(totalRevenue / 1000000).toFixed(1)}jt`, help: `+${period === "week" ? "15%" : "12%"} ${period === "week" ? "minggu" : "bulan"} ini`, color: "green.400", icon: MdDownload },
      { label: "Meja Terisi", value: "18 / 25", help: "72% kapasitas", color: "blue.400", icon: MdTableBar },
      { label: "Rata-rata Order", value: `Rp ${(avgOrder / 1000).toFixed(0)}k`, help: "Per transaksi", color: "purple.400", icon: MdGroups },
    ];
  }, [currentData, period]);

  const maxValue = Math.max(...currentData.map(d => d.value));
  const totalGrowth = period === "week" ? "+18%" : "+12%";

  return (
    <Box bg={bgPage} minH="100vh" pb="60px">
      <PageHeader title="Dasbor Utama" breadcrumb="Dasbor">
        <Flex gap="12px" flexWrap="wrap">
          <InputGroup w={{ base: "100%", md: "280px" }}>
            <InputLeftElement pointerEvents="none">
              <MdSearch color="#A0AEC0" fontSize="20px" />
            </InputLeftElement>
            <Input
              placeholder="Cari pesanan..."
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="18px"
              fontSize="14px"
              fontWeight="600"
              h="46px"
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 3px rgba(251,146,60,.18)" }}
            />
          </InputGroup>

          <Button
            leftIcon={<MdDownload />}
            bg="orange.400"
            color="white"
            borderRadius="18px"
            h="46px"
            fontWeight="800"
            boxShadow="0 12px 24px rgba(251,146,60,.28)"
            _hover={{ bg: "orange.500", transform: "translateY(-2px)" }}
          >
            Export Laporan
          </Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="24px">
        {stats.map((s, i) => (
          <Box
            key={i}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            p="24px"
            borderRadius="30px"
            boxShadow="0 20px 50px rgba(15,23,42,0.08)"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-5px)" }}
            transition="all .25s ease"
          >
            <Flex justify="space-between" align="start" mb="24px">
              <Box
                w="52px"
                h="52px"
                borderRadius="20px"
                bg={s.color}
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="26px"
              >
                <s.icon />
              </Box>

              <Badge borderRadius="full" colorScheme="orange" px="10px">
                Live
              </Badge>
            </Flex>

            <Text fontSize="sm" fontWeight="800" color={textMuted} mb="8px">
              {s.label}
            </Text>

            <Text fontSize="34px" fontWeight="900" color={textDark} lineHeight="1">
              {s.value}
            </Text>

            <Text mt="10px" fontSize="sm" fontWeight="700" color={s.color}>
              {s.help}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="24px" mb="24px">
        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          p="28px"
          borderRadius="32px"
          boxShadow="0 20px 50px rgba(15,23,42,0.08)"
        >
          <Flex justify="space-between" align="center" mb="26px">
            <Box>
              <Text fontSize="xl" fontWeight="900" color={textDark}>
                Penjualan Mingguan
              </Text>
              <Text fontSize="sm" color={textMuted}>
                Ringkasan transaksi 7 hari terakhir
              </Text>
            </Box>

            <Badge colorScheme="green" borderRadius="full" px="12px" py="6px">
              +18%
            </Badge>
          </Flex>

          {/* Period Selector */}
          <HStack spacing="8px" mb="20px">
            <Button
              size="sm"
              leftIcon={<MdDateRange />}
              bg={period === "week" ? "orange.400" : cardBg}
              color={period === "week" ? "white" : textDark}
              borderRadius="12px"
              border="1px solid"
              borderColor={period === "week" ? "orange.400" : borderColor}
              _hover={{ bg: period === "week" ? "orange.500" : "orange.50" }}
              onClick={() => setPeriod("week")}
              fontSize="xs"
              fontWeight="700"
              px="14px"
              h="36px"
            >
              Mingguan
            </Button>
            <Button
              size="sm"
              leftIcon={<MdCalendarToday />}
              bg={period === "month" ? "orange.400" : cardBg}
              color={period === "month" ? "white" : textDark}
              borderRadius="12px"
              border="1px solid"
              borderColor={period === "month" ? "orange.400" : borderColor}
              _hover={{ bg: period === "month" ? "orange.500" : "orange.50" }}
              onClick={() => setPeriod("month")}
              fontSize="xs"
              fontWeight="700"
              px="14px"
              h="36px"
            >
              Bulanan
            </Button>
          </HStack>

          {/* Chart */}
          <Flex h="240px" align="flex-end" gap="12px">
            {currentData.map((item, i) => (
              <Tooltip
                key={i}
                label={
                  <Box>
                    <Text fontWeight="800" fontSize="sm">{item.day}</Text>
                    <Text fontSize="xs" mt="4px">
                      <Text as="span" fontWeight="700">Orders:</Text> {item.orders}
                    </Text>
                    <Text fontSize="xs">
                      <Text as="span" fontWeight="700">Revenue:</Text> Rp {(item.revenue / 1000000).toFixed(1)}jt
                    </Text>
                    <Text fontSize="xs" mt="4px" color="orange.300">
                      <MdTrendingUp style={{ display: "inline", marginRight: "4px" }} />
                      {item.value}% performance
                    </Text>
                  </Box>
                }
                bg={tooltipBg}
                color={tooltipColor}
                borderRadius="16px"
                p="14px"
                boxShadow="0 20px 40px rgba(0,0,0,0.15)"
                hasArrow
                placement="top"
              >
                <Box
                  flex="1"
                  h="100%"
                  display="flex"
                  alignItems="flex-end"
                  cursor="pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <Box
                    w="100%"
                    h={`${(item.value / maxValue) * 100}%`}
                    minH="20px"
                    bg={hoveredBar === i
                      ? "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)"
                      : "linear-gradient(180deg, #fb923c 0%, #f97316 100%)"
                    }
                    borderRadius="18px 18px 8px 8px"
                    boxShadow={hoveredBar === i
                      ? "0 20px 30px rgba(249, 115, 22, 0.4)"
                      : "0 10px 20px rgba(249, 115, 22, 0.2)"
                    }
                    transform={hoveredBar === i ? "scaleY(1.08)" : "scaleY(1)"}
                    transition="all .3s cubic-bezier(0.4, 0, 0.2, 1)"
                    position="relative"
                    _after={hoveredBar === i ? {
                      content: '""',
                      position: "absolute",
                      top: "-8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      w: "8px",
                      h: "8px",
                      borderRadius: "full",
                      bg: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    } : undefined}
                  />
                </Box>
              </Tooltip>
            ))}
          </Flex>

          {/* X Axis Labels */}
          <Flex justify="space-between" mt="18px">
            {currentData.map((item) => (
              <Text
                key={item.day}
                fontSize="xs"
                color={textMuted}
                fontWeight="800"
                flex="1"
                textAlign="center"
              >
                {item.day}
              </Text>
            ))}
          </Flex>

          {/* Summary Stats */}
          <Flex
            justify="space-between"
            mt="24px"
            pt="20px"
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Box>
              <Text fontSize="xs" color={textMuted} fontWeight="700">
                Total Orders ({period === "week" ? "7 hari" : "4 minggu"})
              </Text>
              <Text fontSize="xl" fontWeight="900" color={textDark}>
                {currentData.reduce((acc, item) => acc + item.orders, 0)}
              </Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="xs" color={textMuted} fontWeight="700">
                Rata-rata/Hari
              </Text>
              <Text fontSize="xl" fontWeight="900" color="orange.400">
                {Math.round(currentData.reduce((acc, item) => acc + item.orders, 0) / currentData.length)}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text fontSize="xs" color={textMuted} fontWeight="700">
                Peak Day
              </Text>
              <Text fontSize="xl" fontWeight="900" color="green.400">
                {currentData.reduce((max, item) => item.orders > max.orders ? item : max, currentData[0]).day}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="32px"
          overflow="hidden"
          boxShadow="0 20px 50px rgba(15,23,42,0.08)"
        >
          <Box p="28px" pb="18px">
            <Text fontSize="xl" fontWeight="900" color={textDark}>
              Lokasi Resto
            </Text>
            <Text color={textMuted} fontSize="sm" mt="4px">
              Cabang Utama Jakarta Selatan
            </Text>
          </Box>

          <iframe
            title="Lokasi Resto Rustaf"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.1748281134!2d106.824964!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4a42903ab%3A0x62810d7a04944f6!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1714000000000!5m2!1sen!2sid"
            width="100%"
            height="310"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </SimpleGrid>

      <Box
        bg="linear-gradient(135deg, #fb923c 0%, #f97316 100%)"
        color="white"
        p="30px"
        borderRadius="32px"
        boxShadow="0 22px 50px rgba(249,115,22,.28)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-50px"
          top="-50px"
          w="180px"
          h="180px"
          borderRadius="full"
          bg="whiteAlpha.300"
        />

        <Text fontSize="xl" fontWeight="900" mb="10px">
          Sistem Terintegrasi
        </Text>

        <Text maxW="720px" fontSize="sm" fontWeight="600" opacity=".9" lineHeight="1.8">
          Sistem Resto Rustaf terhubung dengan Google Cloud dan Maps API untuk mendukung akurasi lokasi,
          performa cepat, serta pengelolaan data restoran secara modern.
        </Text>

        <Badge mt="18px" bg="white" color="orange.500" borderRadius="full" px="14px" py="7px">
          API Status: Stabil
        </Badge>
      </Box>
    </Box>
  );
}