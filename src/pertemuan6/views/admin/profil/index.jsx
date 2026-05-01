import React, { useState, useMemo } from "react";
import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, Badge, useColorModeValue, Button, Avatar, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, useDisclosure, useToast,
  InputGroup, InputLeftElement, IconButton, Tooltip, SimpleGrid, Stat, StatLabel, StatNumber, Text
} from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { customersData } from "pertemuan6/variables/restaurantData.js";
import { RestaurantService, Customer } from "pertemuan6/services/restaurantService.js";
import { MdPersonAdd, MdSearch, MdDeleteOutline } from "react-icons/md";

const loyaltyColor = { Gold: "yellow", Silver: "gray", Bronze: "orange" };

export default function DaftarPelanggan() {
  // Encapsulated initialization
  const [customers, setCustomers] = useState(() => RestaurantService.getCustomers(customersData));
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newCustomerData, setNewCustomerData] = useState({
    name: "", email: "", phone: "", loyalty: "Bronze"
  });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const bgSearch = useColorModeValue("secondaryGray.300", "whiteAlpha.200");

  // Logic encapsulated in service
  const filteredCustomers = useMemo(() => 
    RestaurantService.search(searchQuery, customers, ["customerName", "email", "id"]),
    [searchQuery, customers]
  );

  const stats = useMemo(() => ({
    total: customers.length,
    gold: customers.filter(c => c.isGoldMember).length,
    silver: customers.filter(c => c.loyalty === "Silver").length
  }), [customers]);

  const handleAdd = () => {
    if (!newCustomerData.name || !newCustomerData.email) {
        toast({ title: "Error", description: "Lengkapi data!", status: "error" });
        return;
    }

    const newCustomer = new Customer({
        id: `#CUS-${2000 + customers.length}`,
        customerName: newCustomerData.name,
        email: newCustomerData.email,
        phone: newCustomerData.phone,
        loyalty: newCustomerData.loyalty
    });

    setCustomers([newCustomer, ...customers]);
    setNewCustomerData({ name: "", email: "", phone: "", loyalty: "Bronze" });
    onClose();
    toast({ title: "Berhasil", description: "Pelanggan ditambahkan.", status: "success" });
  };

  const handleDelete = (id) => {
    setCustomers(RestaurantService.deleteItem(id, customers));
    toast({ title: "Dihapus", status: "warning" });
  };

  return (
    <Box>
      <PageHeader title="Daftar Pelanggan" breadcrumb={["Manajemen", "Customers"]}>
        <Flex gap="10px">
            <InputGroup w={{ base: "100%", md: "250px" }}>
                <InputLeftElement><MdSearch color="gray.400" /></InputLeftElement>
                <Input variant="filled" placeholder="Cari..." bg={bgSearch} borderRadius="15px" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <Button leftIcon={<MdPersonAdd />} variant="brand" borderRadius="70px" onClick={onOpen}>Tambah</Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <Card p="15px"><Stat><StatLabel color={subTextColor}>Total Pelanggan</StatLabel><StatNumber color={textColor}>{stats.total}</StatNumber></Stat></Card>
        <Card p="15px"><Stat><StatLabel color="yellow.400">Gold Members</StatLabel><StatNumber color={textColor}>{stats.gold}</StatNumber></Stat></Card>
        <Card p="15px"><Stat><StatLabel color="gray.400">Silver Members</StatLabel><StatNumber color={textColor}>{stats.silver}</StatNumber></Stat></Card>
      </SimpleGrid>

      <Card p="0px" overflowX="auto">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>ID</Th>
                <Th borderColor={borderColor}>Name</Th>
                <Th borderColor={borderColor}>Email</Th>
                <Th borderColor={borderColor}>Loyalty</Th>
                <Th borderColor={borderColor}>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCustomers.map((customer) => (
                <Tr key={customer.id}>
                  <Td borderColor={borderColor} fontWeight="700" color={textColor}>{customer.id}</Td>
                  <Td borderColor={borderColor}>
                    <Flex align="center">
                        <Avatar size="sm" name={customer.customerName} me="10px" />
                        <Text color={textColor} fontWeight="600">{customer.customerName}</Text>
                    </Flex>
                  </Td>
                  <Td borderColor={borderColor} color={textColor}>{customer.email}</Td>
                  <Td borderColor={borderColor}>
                    <Badge colorScheme={loyaltyColor[customer.loyalty]} variant="solid" borderRadius="full" px="10px">
                      {customer.loyalty}
                    </Badge>
                  </Td>
                  <Td borderColor={borderColor}>
                    <IconButton icon={<MdDeleteOutline />} variant="ghost" colorScheme="red" onClick={() => handleDelete(customer.id)} />
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
          <ModalHeader>Tambah Pelanggan</ModalHeader>
          <ModalBody>
            <FormControl mb="4"><FormLabel>Nama</FormLabel><Input value={newCustomerData.name} onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})} /></FormControl>
            <FormControl mb="4"><FormLabel>Email</FormLabel><Input value={newCustomerData.email} onChange={(e) => setNewCustomerData({...newCustomerData, email: e.target.value})} /></FormControl>
            <FormControl><FormLabel>Loyalty</FormLabel><Select value={newCustomerData.loyalty} onChange={(e) => setNewCustomerData({...newCustomerData, loyalty: e.target.value})}><option value="Bronze">Bronze</option><option value="Silver">Silver</option><option value="Gold">Gold</option></Select></FormControl>
          </ModalBody>
          <ModalFooter><Button onClick={onClose}>Batal</Button><Button colorScheme="brand" ml={3} onClick={handleAdd}>Simpan</Button></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
