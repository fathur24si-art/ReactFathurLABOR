import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Button,
  HStack,
  Badge,
  Progress,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Icon,
} from "@chakra-ui/react";

import {
  MdTrendingUp,
  MdShoppingCart,
  MdAttachMoney,
  MdStar,
  MdPeople,
  MdRestaurantMenu,
} from "react-icons/md";

import PageHeader from "components/pageHeader/PageHeader.jsx";

export default function LaporanRestoran() {

  const pageBg = useColorModeValue("#F8FAFC", "#0F172A");

  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.92)",
    "rgba(15,23,42,0.86)"
  );

  const textColor = useColorModeValue("gray.900", "white");

  const subTextColor = useColorModeValue(
    "gray.600",
    "gray.400"
  );

  const borderColor = useColorModeValue(
    "gray.100",
    "whiteAlpha.200"
  );

  const softBg = useColorModeValue(
    "orange.50",
    "whiteAlpha.100"
  );

  const statsData = [
    {
      title: "Pesanan Hari Ini",
      value: "74",
      icon: MdShoppingCart,
      color: "orange.400",
    },
    {
      title: "Pendapatan",
      value: "Rp 12.400.000",
      icon: MdAttachMoney,
      color: "green.400",
    },
    {
      title: "Pelanggan",
      value: "320",
      icon: MdPeople,
      color: "blue.400",
    },
    {
      title: "Rating",
      value: "4.8 / 5",
      icon: MdStar,
      color: "yellow.400",
    },
  ];

  const transaksi = [
    {
      nama: "Nasi Goreng",
      kategori: "Makanan",
      total: "120",
      pendapatan: "Rp 2.400.000",
      status: "Best Seller",
    },
    {
      nama: "Es Teh",
      kategori: "Minuman",
      total: "90",
      pendapatan: "Rp 900.000",
      status: "Laris",
    },
    {
      nama: "Ayam Bakar",
      kategori: "Makanan",
      total: "50",
      pendapatan: "Rp 1.500.000",
      status: "Normal",
    },
  ];

  const aktivitas = [
    "Pesanan baru masuk dari meja 7",
    "Menu Ayam Bakar hampir habis",
    "Pelanggan memberikan rating 5",
    "Transaksi berhasil dibayar",
  ];

  return (
    <Box bg={pageBg} minH="100vh" pb="60px">

      <PageHeader
        title="Components "
        breadcrumb={["Manajemen", "Laporan Restoran"]}
      />

      {/* HEADER CARD */}
      <Box
        bg={cardBg}
        borderRadius="32px"
        p="30px"
        mb="24px"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 20px 50px rgba(15,23,42,0.08)"
      >

        <Flex
          justify="space-between"
          align={{ base: "start", lg: "center" }}
          direction={{ base: "column", lg: "row" }}
          gap="20px"
        >

          <Box>

            <Text
              color={textColor}
              fontSize="32px"
              fontWeight="900"
              mb="10px"
            >
              Ringkasan Operasional 🚀
            </Text>

            <Text
              color={subTextColor}
              fontSize="md"
              maxW="700px"
              lineHeight="30px"
            >
              Dashboard ini digunakan untuk memantau performa restoran,
              transaksi harian, statistik pelanggan, dan aktivitas operasional
              secara realtime.
            </Text>

          </Box>

          <HStack spacing="14px">

            <Button
              bg="orange.400"
              color="white"
              borderRadius="18px"
              _hover={{ bg: "orange.500" }}
            >
              Export PDF
            </Button>

            <Button
              borderRadius="18px"
              variant="outline"
            >
              Refresh
            </Button>

          </HStack>

        </Flex>

      </Box>

      {/* STATS */}
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 4 }}
        gap="20px"
        mb="24px"
      >

        {statsData.map((item, index) => (

          <Box
            key={index}
            bg={cardBg}
            p="24px"
            borderRadius="30px"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 20px 40px rgba(15,23,42,0.08)"
          >

            <Flex justify="space-between" align="center">

              <Box>

                <Stat>

                  <StatLabel
                    color={subTextColor}
                    fontWeight="700"
                  >
                    {item.title}
                  </StatLabel>

                  <StatNumber
                    color={textColor}
                    fontSize="30px"
                    fontWeight="900"
                  >
                    {item.value}
                  </StatNumber>

                </Stat>

              </Box>

              <Flex
                w="65px"
                h="65px"
                borderRadius="20px"
                bg={softBg}
                align="center"
                justify="center"
              >
                <Icon
                  as={item.icon}
                  boxSize="32px"
                  color={item.color}
                />
              </Flex>

            </Flex>

          </Box>

        ))}

      </SimpleGrid>

      {/* CONTENT GRID */}
      <SimpleGrid
        columns={{ base: 1, xl: 3 }}
        gap="24px"
        mb="24px"
      >

        {/* LEFT */}
        <Box
          gridColumn={{ xl: "span 2" }}
          bg={cardBg}
          borderRadius="30px"
          p="26px"
          border="1px solid"
          borderColor={borderColor}
        >

          <Flex
            justify="space-between"
            align="center"
            mb="24px"
          >

            <Box>

              <Text
                color={textColor}
                fontSize="xl"
                fontWeight="900"
              >
                Laporan Penjualan
              </Text>

              <Text
                color={subTextColor}
                mt="4px"
              >
                Statistik menu paling banyak dibeli
              </Text>

            </Box>

            <Badge
              colorScheme="green"
              borderRadius="full"
              px="14px"
              py="6px"
            >
              Updated
            </Badge>

          </Flex>

          <Table variant="simple">

            <Thead>

              <Tr>

                <Th>Menu</Th>
                <Th>Kategori</Th>
                <Th>Total</Th>
                <Th>Pendapatan</Th>
                <Th>Status</Th>

              </Tr>

            </Thead>

            <Tbody>

              {transaksi.map((item, index) => (

                <Tr key={index}>

                  <Td>

                    <Flex align="center" gap="12px">

                      <Avatar
                        size="sm"
                        name={item.nama}
                      />

                      <Text fontWeight="700">
                        {item.nama}
                      </Text>

                    </Flex>

                  </Td>

                  <Td>{item.kategori}</Td>

                  <Td>{item.total}</Td>

                  <Td>{item.pendapatan}</Td>

                  <Td>

                    <Badge
                      colorScheme={
                        item.status === "Best Seller"
                          ? "orange"
                          : item.status === "Laris"
                          ? "green"
                          : "gray"
                      }
                      borderRadius="full"
                      px="10px"
                    >
                      {item.status}
                    </Badge>

                  </Td>

                </Tr>

              ))}

            </Tbody>

          </Table>

        </Box>

        {/* RIGHT */}
        <Box
          bg={cardBg}
          borderRadius="30px"
          p="26px"
          border="1px solid"
          borderColor={borderColor}
        >

          <Text
            color={textColor}
            fontSize="xl"
            fontWeight="900"
            mb="24px"
          >
            Aktivitas Terbaru
          </Text>

          <Flex direction="column" gap="18px">

            {aktivitas.map((item, index) => (

              <Box
                key={index}
                bg={softBg}
                p="18px"
                borderRadius="20px"
              >

                <Flex gap="14px">

                  <Flex
                    minW="50px"
                    h="50px"
                    borderRadius="16px"
                    bg="orange.400"
                    align="center"
                    justify="center"
                  >
                    <MdRestaurantMenu color="white" />
                  </Flex>

                  <Box>

                    <Text
                      color={textColor}
                      fontWeight="700"
                    >
                      {item}
                    </Text>

                    <Text
                      color={subTextColor}
                      fontSize="sm"
                      mt="4px"
                    >
                      Baru saja
                    </Text>

                  </Box>

                </Flex>

              </Box>

            ))}

          </Flex>

        </Box>

      </SimpleGrid>

      {/* PERFORMANCE */}
      <Box
        bg={cardBg}
        borderRadius="30px"
        p="26px"
        border="1px solid"
        borderColor={borderColor}
      >

        <Flex
          justify="space-between"
          align="center"
          mb="20px"
        >

          <Box>

            <Text
              color={textColor}
              fontSize="xl"
              fontWeight="900"
            >
              Progress Performa
            </Text>

            <Text
              color={subTextColor}
              mt="4px"
            >
              Monitoring performa restoran bulan ini
            </Text>

          </Box>

          <Badge
            colorScheme="purple"
            borderRadius="full"
            px="12px"
            py="5px"
          >
            Monthly
          </Badge>

        </Flex>

        <Divider mb="20px" />

        <Flex direction="column" gap="22px">

          {[
            {
              label: "Target Penjualan",
              value: 80,
            },
            {
              label: "Kepuasan Pelanggan",
              value: 95,
            },
            {
              label: "Kecepatan Pelayanan",
              value: 70,
            },
          ].map((item, index) => (

            <Box key={index}>

              <Flex
                justify="space-between"
                mb="10px"
              >

                <Text
                  color={textColor}
                  fontWeight="700"
                >
                  {item.label}
                </Text>

                <Text
                  color={subTextColor}
                  fontWeight="700"
                >
                  {item.value}%
                </Text>

              </Flex>

              <Progress
                value={item.value}
                borderRadius="full"
                size="lg"
                colorScheme="orange"
              />

            </Box>

          ))}

        </Flex>

      </Box>

    </Box>
  );
}