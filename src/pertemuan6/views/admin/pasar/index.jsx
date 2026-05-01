import React, { useState, useRef } from "react";
import {
  Box, Text, SimpleGrid, Badge, useColorModeValue, Flex, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, useDisclosure, useToast,
  IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  InputGroup, InputLeftElement, Tag, TagLabel, HStack, Stat, StatLabel, StatNumber, Image
} from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import { MdAdd, MdSearch, MdDeleteOutline, MdEdit, MdPhotoSizeSelectActual } from "react-icons/md";

const defaultMenuItems = [
  { id: 1, name: "Nasi Goreng Rustaf", kategori: "Makanan", harga: "35000", status: "Tersedia", image: "https://lh3.googleusercontent.com/proxy/UqZ89oFh_31_yvRbeIof8Y-8Q_V1pX8V1f8q-qJ1V1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1" },
  { id: 2, name: "Ayam Bakar Madu", kategori: "Makanan", harga: "45000", status: "Tersedia", image: "" },
  { id: 3, name: "Es Teh Manis", kategori: "Minuman", harga: "8000", status: "Tersedia", image: "" },
  { id: 4, name: "Jus Alpukat", kategori: "Minuman", harga: "15000", status: "Habis", image: "" },
  { id: 5, name: "Sate Ayam 10 Tusuk", kategori: "Makanan", harga: "30000", status: "Tersedia", image: "" },
  { id: 6, name: "Kopi Hitam", kategori: "Minuman", harga: "12000", status: "Tersedia", image: "" },
];

const categoryColor = { Makanan: "orange", Minuman: "teal" };

export default function MenuMakanan() {
  const [menu, setMenu] = useState(defaultMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const [currentEdit, setCurrentEdit] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ name: "", kategori: "Makanan", harga: "", status: "Tersedia", image: "" });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const bgSearch = useColorModeValue("secondaryGray.300", "whiteAlpha.200");

  const filteredMenu = menu.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterKategori === "Semua" || item.kategori === filterKategori;
    return matchSearch && matchCat;
  });

  const stats = {
    total: menu.length,
    makanan: menu.filter(m => m.kategori === "Makanan").length,
    minuman: menu.filter(m => m.kategori === "Minuman").length
  };

  const handleOpenForm = (item = null) => {
    if (item) {
        setCurrentEdit(item.id);
        setFormData({ name: item.name, kategori: item.kategori, harga: item.harga, status: item.status, image: item.image || "" });
    } else {
        setCurrentEdit(null);
        setFormData({ name: "", kategori: "Makanan", harga: "", status: "Tersedia", image: "" });
    }
    onFormOpen();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.harga) {
        toast({ title: "Error", description: "Lengkapi data!", status: "error" });
        return;
    }
    if (currentEdit) {
        setMenu(menu.map(m => m.id === currentEdit ? { ...m, ...formData } : m));
        toast({ title: "Berhasil", description: "Menu diperbarui.", status: "success" });
    } else {
        setMenu([{ id: Date.now(), ...formData }, ...menu]);
        toast({ title: "Berhasil", description: "Menu baru ditambahkan.", status: "success" });
    }
    onFormClose();
  };

  const confirmDelete = (item) => {
    setDeleteTarget(item);
    onAlertOpen();
  };

  const handleDelete = () => {
    setMenu(menu.filter(m => m.id !== deleteTarget.id));
    onAlertClose();
    toast({ title: "Dihapus", description: "Menu dihapus.", status: "info" });
  };

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <Box>
      <PageHeader title="Menu Resto Rustaf" breadcrumb={["Manajemen", "Menu"]}>
        <Flex gap="10px" wrap="wrap">
            <InputGroup w={{ base: "100%", md: "250px" }}>
                <InputLeftElement pointerEvents="none"><MdSearch color="gray.400" /></InputLeftElement>
                <Input variant="filled" placeholder="Cari menu..." bg={bgSearch} borderRadius="15px" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <Button leftIcon={<MdAdd />} variant="brand" borderRadius="70px" onClick={() => handleOpenForm()}>Tambah</Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <Card p="15px">
            <Stat><StatLabel color={subTextColor}>Total Menu</StatLabel><StatNumber color={textColor}>{stats.total}</StatNumber></Stat>
        </Card>
        <Card p="15px">
            <Stat><StatLabel color="orange.400">Total Makanan</StatLabel><StatNumber color={textColor}>{stats.makanan}</StatNumber></Stat>
        </Card>
        <Card p="15px">
            <Stat><StatLabel color="teal.400">Total Minuman</StatLabel><StatNumber color={textColor}>{stats.minuman}</StatNumber></Stat>
        </Card>
      </SimpleGrid>

      <HStack spacing={2} mb="20px">
         {["Semua", "Makanan", "Minuman"].map(cat => (
            <Tag key={cat} size="lg" borderRadius="full" variant={filterKategori === cat ? "solid" : "outline"} colorScheme="brand" cursor="pointer" onClick={() => setFilterKategori(cat)}><TagLabel>{cat}</TagLabel></Tag>
         ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="20px">
        {filteredMenu.map((item) => (
          <Card key={item.id} p="0px" overflow="hidden">
            <Box h="180px" bg={useColorModeValue("gray.100", "whiteAlpha.50")} position="relative">
                {item.image ? (
                    <Image src={item.image} w="100%" h="100%" objectFit="cover" />
                ) : (
                    <Flex w="100%" h="100%" align="center" justify="center" direction="column" color="gray.400">
                        <MdPhotoSizeSelectActual size="40px" />
                        <Text fontSize="xs" mt="2">Tanpa Foto</Text>
                    </Flex>
                )}
                <Badge 
                    position="absolute" top="10px" right="10px" 
                    colorScheme={item.status === "Tersedia" ? "green" : "red"} 
                    borderRadius="full" px="10px" boxShadow="lg"
                >
                    {item.status}
                </Badge>
            </Box>
            <Box p="20px">
                <Flex justify="space-between" align="start" mb="10px">
                    <Box>
                        <Text fontWeight="700" color={textColor} fontSize="lg">{item.name}</Text>
                        <Badge colorScheme={categoryColor[item.kategori]} variant="subtle" size="sm">{item.kategori}</Badge>
                    </Box>
                    <Text fontWeight="800" color="brand.500" fontSize="lg">{formatIDR(item.harga)}</Text>
                </Flex>
                <Flex justify="flex-end">
                    <HStack>
                        <IconButton size="sm" icon={<MdEdit />} variant="ghost" onClick={() => handleOpenForm(item)} />
                        <IconButton size="sm" icon={<MdDeleteOutline />} variant="ghost" colorScheme="red" onClick={() => confirmDelete(item)} />
                    </HStack>
                </Flex>
            </Box>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="20px">
          <ModalHeader>{currentEdit ? "Edit Menu" : "Tambah Menu"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4"><FormLabel>Foto Menu</FormLabel>
                <Input type="file" p="1" accept="image/*" onChange={handleFileChange} />
                {formData.image && <Image src={formData.image} mt="3" borderRadius="10px" h="100px" objectFit="cover" />}
            </FormControl>
            <FormControl mb="4"><FormLabel>Nama Menu</FormLabel>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></FormControl>
            <FormControl mb="4"><FormLabel>Harga (Angka)</FormLabel>
                <Input type="number" value={formData.harga} onChange={(e) => setFormData({...formData, harga: e.target.value})} /></FormControl>
            <SimpleGrid columns={2} gap="4">
                <FormControl><FormLabel>Kategori</FormLabel>
                    <Select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})}><option value="Makanan">Makanan</option><option value="Minuman">Minuman</option></Select></FormControl>
                <FormControl><FormLabel>Status</FormLabel>
                    <Select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Tersedia">Tersedia</option><option value="Habis">Habis</option></Select></FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter><Button onClick={onFormClose}>Batal</Button><Button colorScheme="brand" ml={3} onClick={handleSave}>Simpan</Button></ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onAlertClose} isCentered>
        <AlertDialogOverlay backdropFilter="blur(5px)"><AlertDialogContent borderRadius="20px">
            <AlertDialogHeader>Hapus Menu</AlertDialogHeader>
            <AlertDialogBody>Yakin ingin menghapus menu ini?</AlertDialogBody>
            <AlertDialogFooter><Button ref={cancelRef} onClick={onAlertClose}>Batal</Button><Button colorScheme="red" onClick={handleDelete} ml={3}>Hapus</Button></AlertDialogFooter>
        </AlertDialogContent></AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
