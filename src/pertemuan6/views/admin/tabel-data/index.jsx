import React, { useState, useMemo } from "react";
import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, Badge, useColorModeValue, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, useDisclosure, useToast,
  Flex, InputGroup, InputLeftElement, IconButton, SimpleGrid, Stat, StatLabel, StatNumber, Text
} from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { ordersData } from "pertemuan6/variables/restaurantData.js";
import { RestaurantService, Order } from "pertemuan6/services/restaurantService.js";
import { MdFilterList, MdAddCircleOutline, MdSearch, MdDeleteSweep } from "react-icons/md";

const statusColor = { Completed: "green", Pending: "orange", Cancelled: "red" };

export default function PesananPelanggan() {
  const [orders, setOrders] = useState(() => RestaurantService.getOrders(ordersData));
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newOrderData, setNewOrderData] = useState({ customerName: "", status: "Pending", totalPrice: "" });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const bgSearch = useColorModeValue("secondaryGray.300", "whiteAlpha.200");

  const filteredOrders = useMemo(() => 
    RestaurantService.search(searchQuery, orders, ["customerName", "id"]),
    [searchQuery, orders]
  );

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    completed: orders.filter(o => o.isCompleted).length
  }), [orders]);

  const handleAddOrder = () => {
    if (!newOrderData.customerName || !newOrderData.totalPrice) {
        toast({ title: "Error", description: "Lengkapi data!", status: "error" });
        return;
    }

    const newOrder = new Order({
        id: `#ORD-${1000 + orders.length}`,
        customerName: newOrderData.customerName,
        status: newOrderData.status,
        totalPrice: newOrderData.totalPrice, // Service handles parsing if needed
        orderDate: new Date().toISOString().split('T')[0]
    });

    setOrders([newOrder, ...orders]);
    onClose();
    toast({ title: "Sukses", description: "Pesanan masuk.", status: "success" });
  };

  const handleDelete = (id) => {
    setOrders(RestaurantService.deleteItem(id, orders));
    toast({ title: "Dihapus", status: "info" });
  };

  return (
    <Box>
      <PageHeader title="Daftar Pesanan" breadcrumb={["Manajemen", "Orders"]}>
        <Flex gap="10px">
            <InputGroup w={{ base: "100%", md: "250px" }}>
                <InputLeftElement><MdSearch color="gray.400" /></InputLeftElement>
                <Input variant="filled" placeholder="Cari..." bg={bgSearch} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <Button leftIcon={<MdAddCircleOutline />} variant="brand" borderRadius="70px" onClick={onOpen}>Tambah</Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <Card p="15px"><Stat><StatLabel color={subTextColor}>Total Pesanan</StatLabel><StatNumber color={textColor}>{stats.total}</StatNumber></Stat></Card>
        <Card p="15px"><Stat><StatLabel color="orange.400">Menunggu (Pending)</StatLabel><StatNumber color={textColor}>{stats.pending}</StatNumber></Stat></Card>
        <Card p="15px"><Stat><StatLabel color="green.400">Selesai (Completed)</StatLabel><StatNumber color={textColor}>{stats.completed}</StatNumber></Stat></Card>
      </SimpleGrid>

      <Card p="0px" overflowX="auto">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>ID</Th>
                <Th borderColor={borderColor}>Customer</Th>
                <Th borderColor={borderColor}>Status</Th>
                <Th borderColor={borderColor}>Total</Th>
                <Th borderColor={borderColor}>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders.map((order) => (
                <Tr key={order.id}>
                  <Td borderColor={borderColor} fontWeight="700" color={textColor}>{order.id}</Td>
                  <Td borderColor={borderColor} color={textColor}>{order.customerName}</Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={statusColor[order.status]} borderRadius="full" px="10px">{order.status}</Badge>
                  </Td>
                  <Td borderColor={borderColor} fontWeight="700" color={textColor}>{order.formattedTotal}</Td>
                  <Td borderColor={borderColor}>
                    <IconButton size="sm" icon={<MdDeleteSweep />} colorScheme="red" variant="ghost" onClick={() => handleDelete(order.id)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="20px">
          <ModalHeader>Buat Pesanan</ModalHeader>
          <ModalBody>
            <FormControl mb="4"><FormLabel>Nama</FormLabel><Input value={newOrderData.customerName} onChange={(e) => setNewOrderData({...newOrderData, customerName: e.target.value})} /></FormControl>
            <FormControl mb="4"><FormLabel>Total Harga (RB)</FormLabel><Input type="number" value={newOrderData.totalPrice} onChange={(e) => setNewOrderData({...newOrderData, totalPrice: e.target.value})} /></FormControl>
            <FormControl><FormLabel>Status</FormLabel><Select value={newOrderData.status} onChange={(e) => setNewOrderData({...newOrderData, status: e.target.value})}><option value="Pending">Pending</option><option value="Completed">Completed</option></Select></FormControl>
          </ModalBody>
          <ModalFooter><Button onClick={onClose}>Batal</Button><Button colorScheme="brand" ml={3} onClick={handleAddOrder}>Simpan</Button></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
