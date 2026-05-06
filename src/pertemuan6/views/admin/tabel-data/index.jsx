import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
  Flex,
  InputGroup,
  InputLeftElement,
  IconButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { ordersData } from "pertemuan6/variables/restaurantData.js";
import { RestaurantService, Order } from "pertemuan6/services/restaurantService.js";
import {
  MdAddCircleOutline,
  MdSearch,
  MdDeleteSweep,
  MdShoppingCart,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";

const statusColor = {
  Completed: "green",
  Pending: "orange",
  Cancelled: "red",
};

export default function PesananPelanggan() {
  const [orders, setOrders] = useState(() =>
    RestaurantService.getOrders(ordersData)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newOrderData, setNewOrderData] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
  });

  const pageBg = useColorModeValue("#F8FAFC", "#0F172A");
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.92)",
    "rgba(15,23,42,0.86)"
  );
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const rowHover = useColorModeValue("orange.50", "whiteAlpha.100");

  const filteredOrders = useMemo(
    () => RestaurantService.search(searchQuery, orders, ["customerName", "id"]),
    [searchQuery, orders]
  );

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      completed: orders.filter((o) => o.isCompleted).length,
    }),
    [orders]
  );

  const handleAddOrder = () => {
    if (!newOrderData.customerName || !newOrderData.totalPrice) {
      toast({
        title: "Error",
        description: "Lengkapi data!",
        status: "error",
      });
      return;
    }

    const newOrder = new Order({
      id: `#ORD-${1000 + orders.length}`,
      customerName: newOrderData.customerName,
      status: newOrderData.status,
      totalPrice: newOrderData.totalPrice,
      orderDate: new Date().toISOString().split("T")[0],
    });

    setOrders([newOrder, ...orders]);
    setNewOrderData({
      customerName: "",
      status: "Pending",
      totalPrice: "",
    });
    onClose();

    toast({
      title: "Sukses",
      description: "Pesanan masuk.",
      status: "success",
    });
  };

  const handleDelete = (id) => {
    setOrders(RestaurantService.deleteItem(id, orders));
    toast({
      title: "Dihapus",
      status: "info",
    });
  };

  const statCards = [
    {
      label: "Total Pesanan",
      value: stats.total,
      color: "orange.400",
      icon: MdShoppingCart,
    },
    {
      label: "Menunggu",
      value: stats.pending,
      color: "yellow.400",
      icon: MdAccessTime,
    },
    {
      label: "Selesai",
      value: stats.completed,
      color: "green.400",
      icon: MdCheckCircle,
    },
  ];

  return (
    <Box bg={pageBg} minH="100vh" pb="60px">
      <PageHeader title="Daftar Pesanan" breadcrumb={["Manajemen", "Orders"]}>
        <Flex gap="12px" wrap="wrap">
          <InputGroup w={{ base: "100%", md: "280px" }}>
            <InputLeftElement pointerEvents="none">
              <MdSearch color="#A0AEC0" />
            </InputLeftElement>
            <Input
              placeholder="Cari pesanan..."
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="18px"
              h="46px"
              fontWeight="600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              _focus={{
                borderColor: "orange.400",
                boxShadow: "0 0 0 3px rgba(251,146,60,.18)",
              }}
            />
          </InputGroup>

          <Button
            leftIcon={<MdAddCircleOutline />}
            bg="orange.400"
            color="white"
            borderRadius="18px"
            h="46px"
            fontWeight="800"
            boxShadow="0 12px 24px rgba(251,146,60,.28)"
            _hover={{ bg: "orange.500", transform: "translateY(-2px)" }}
            onClick={onOpen}
          >
            Tambah Pesanan
          </Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="24px">
        {statCards.map((item, index) => (
          <Box
            key={index}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="30px"
            p="24px"
            boxShadow="0 18px 40px rgba(15,23,42,0.08)"
          >
            <Flex justify="space-between" align="center">
              <Stat>
                <StatLabel color={subTextColor} fontWeight="800">
                  {item.label}
                </StatLabel>
                <StatNumber color={textColor} fontSize="36px" fontWeight="900">
                  {item.value}
                </StatNumber>
              </Stat>

              <Flex
                w="54px"
                h="54px"
                borderRadius="20px"
                align="center"
                justify="center"
                bg={item.color}
                color="white"
                fontSize="28px"
              >
                <item.icon />
              </Flex>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="32px"
        overflow="hidden"
        boxShadow="0 20px 50px rgba(15,23,42,0.08)"
      >
        <Flex
          justify="space-between"
          align="center"
          px="24px"
          py="20px"
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          <Box>
            <Text fontSize="xl" fontWeight="900" color={textColor}>
              List Pesanan
            </Text>
            <Text fontSize="sm" color={subTextColor}>
              Kelola data pesanan pelanggan Resto Rustaf
            </Text>
          </Box>

          <Badge colorScheme="orange" borderRadius="full" px="12px" py="6px">
            {filteredOrders.length} Data
          </Badge>
        </Flex>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor={borderColor} color={subTextColor}>ID</Th>
                <Th borderColor={borderColor} color={subTextColor}>Customer</Th>
                <Th borderColor={borderColor} color={subTextColor}>Status</Th>
                <Th borderColor={borderColor} color={subTextColor}>Total</Th>
                <Th borderColor={borderColor} color={subTextColor}>Aksi</Th>
              </Tr>
            </Thead>

            <Tbody>
              {filteredOrders.map((order) => (
                <Tr
                  key={order.id}
                  _hover={{ bg: rowHover }}
                  transition="all .2s ease"
                >
                  <Td borderColor={borderColor} fontWeight="900" color="orange.400">
                    {order.id}
                  </Td>

                  <Td borderColor={borderColor}>
                    <Text fontWeight="800" color={textColor}>
                      {order.customerName}
                    </Text>
                    <Text fontSize="xs" color={subTextColor}>
                      Pelanggan Resto Rustaf
                    </Text>
                  </Td>

                  <Td borderColor={borderColor}>
                    <Badge
                      colorScheme={statusColor[order.status]}
                      borderRadius="full"
                      px="12px"
                      py="6px"
                    >
                      {order.status}
                    </Badge>
                  </Td>

                  <Td borderColor={borderColor} fontWeight="900" color={textColor}>
                    {order.formattedTotal}
                  </Td>

                  <Td borderColor={borderColor}>
                    <IconButton
                      size="md"
                      icon={<MdDeleteSweep />}
                      borderRadius="16px"
                      bg="red.50"
                      color="red.400"
                      _hover={{ bg: "red.100" }}
                      onClick={() => handleDelete(order.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent borderRadius="30px" bg={cardBg} p="6px">
          <ModalHeader color={textColor} fontWeight="900">
            Buat Pesanan
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb="4">
              <FormLabel fontWeight="800">Nama Pelanggan</FormLabel>
              <Input
                borderRadius="16px"
                value={newOrderData.customerName}
                onChange={(e) =>
                  setNewOrderData({
                    ...newOrderData,
                    customerName: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel fontWeight="800">Total Harga</FormLabel>
              <Input
                borderRadius="16px"
                type="number"
                value={newOrderData.totalPrice}
                onChange={(e) =>
                  setNewOrderData({
                    ...newOrderData,
                    totalPrice: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="800">Status</FormLabel>
              <Select
                borderRadius="16px"
                value={newOrderData.status}
                onChange={(e) =>
                  setNewOrderData({
                    ...newOrderData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button borderRadius="16px" onClick={onClose}>
              Batal
            </Button>
            <Button
              bg="orange.400"
              color="white"
              borderRadius="16px"
              ml={3}
              _hover={{ bg: "orange.500" }}
              onClick={handleAddOrder}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}