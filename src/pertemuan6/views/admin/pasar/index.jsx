import React, { useState, useRef } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Flex,
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
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Image,
} from "@chakra-ui/react";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import {
  MdAdd,
  MdSearch,
  MdDeleteOutline,
  MdEdit,
  MdPhotoSizeSelectActual,
} from "react-icons/md";

const defaultMenuItems = [
  {
    id: 1,
    name: "Nasi Goreng Rustaf",
    kategori: "Makanan",
    harga: "35000",
    status: "Tersedia",
    image: "",
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    kategori: "Makanan",
    harga: "45000",
    status: "Tersedia",
    image: "",
  },
  {
    id: 3,
    name: "Es Teh Manis",
    kategori: "Minuman",
    harga: "8000",
    status: "Tersedia",
    image: "",
  },
  {
    id: 4,
    name: "Jus Alpukat",
    kategori: "Minuman",
    harga: "15000",
    status: "Habis",
    image: "",
  },
  {
    id: 5,
    name: "Sate Ayam 10 Tusuk",
    kategori: "Makanan",
    harga: "30000",
    status: "Tersedia",
    image: "",
  },
  {
    id: 6,
    name: "Kopi Hitam",
    kategori: "Minuman",
    harga: "12000",
    status: "Tersedia",
    image: "",
  },
];

const categoryColor = {
  Makanan: "orange",
  Minuman: "teal",
};

export default function MenuMakanan() {
  const [menu, setMenu] = useState(defaultMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const cancelRef = useRef();
  const toast = useToast();

  const [currentEdit, setCurrentEdit] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    kategori: "Makanan",
    harga: "",
    status: "Tersedia",
    image: "",
  });

  const pageBg = useColorModeValue("#F8FAFC", "#0F172A");
  const cardBg = useColorModeValue("rgba(255,255,255,0.92)", "rgba(15,23,42,0.86)");
  const softBg = useColorModeValue("orange.50", "whiteAlpha.100");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  const filteredMenu = menu.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCat = filterKategori === "Semua" || item.kategori === filterKategori;
    return matchSearch && matchCat;
  });

  const stats = {
    total: menu.length,
    makanan: menu.filter((m) => m.kategori === "Makanan").length,
    minuman: menu.filter((m) => m.kategori === "Minuman").length,
  };

  const handleOpenForm = (item = null) => {
    if (item) {
      setCurrentEdit(item.id);
      setFormData({
        name: item.name,
        kategori: item.kategori,
        harga: item.harga,
        status: item.status,
        image: item.image || "",
      });
    } else {
      setCurrentEdit(null);
      setFormData({
        name: "",
        kategori: "Makanan",
        harga: "",
        status: "Tersedia",
        image: "",
      });
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
      toast({
        title: "Error",
        description: "Lengkapi data!",
        status: "error",
      });
      return;
    }

    if (currentEdit) {
      setMenu(
        menu.map((m) => (m.id === currentEdit ? { ...m, ...formData } : m))
      );
      toast({
        title: "Berhasil",
        description: "Menu diperbarui.",
        status: "success",
      });
    } else {
      setMenu([{ id: Date.now(), ...formData }, ...menu]);
      toast({
        title: "Berhasil",
        description: "Menu baru ditambahkan.",
        status: "success",
      });
    }

    onFormClose();
  };

  const confirmDelete = (item) => {
    setDeleteTarget(item);
    onAlertOpen();
  };

  const handleDelete = () => {
    setMenu(menu.filter((m) => m.id !== deleteTarget.id));
    onAlertClose();

    toast({
      title: "Dihapus",
      description: "Menu dihapus.",
      status: "info",
    });
  };

  const formatIDR = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Box bg={pageBg} minH="100vh" pb="60px">
      <PageHeader title="Menu Resto Rustaf" breadcrumb={["Manajemen", "Menu"]}>
        <Flex gap="12px" wrap="wrap">
          <InputGroup w={{ base: "100%", md: "280px" }}>
            <InputLeftElement pointerEvents="none">
              <MdSearch color="#A0AEC0" />
            </InputLeftElement>
            <Input
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="18px"
              h="46px"
              fontWeight="600"
              _focus={{
                borderColor: "orange.400",
                boxShadow: "0 0 0 3px rgba(251,146,60,.18)",
              }}
            />
          </InputGroup>

          <Button
            leftIcon={<MdAdd />}
            bg="orange.400"
            color="white"
            borderRadius="18px"
            h="46px"
            fontWeight="800"
            boxShadow="0 12px 24px rgba(251,146,60,.28)"
            _hover={{ bg: "orange.500", transform: "translateY(-2px)" }}
            onClick={() => handleOpenForm()}
          >
            Tambah Menu
          </Button>
        </Flex>
      </PageHeader>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="22px">
        {[
          { label: "Total Menu", value: stats.total, color: "orange.400" },
          { label: "Total Makanan", value: stats.makanan, color: "green.400" },
          { label: "Total Minuman", value: stats.minuman, color: "teal.400" },
        ].map((item, index) => (
          <Box
            key={index}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="28px"
            p="22px"
            boxShadow="0 18px 40px rgba(15,23,42,0.08)"
          >
            <Stat>
              <StatLabel color={subTextColor} fontWeight="800">
                {item.label}
              </StatLabel>
              <StatNumber color={textColor} fontSize="34px" fontWeight="900">
                {item.value}
              </StatNumber>
            </Stat>
            <Box mt="12px" h="5px" w="64px" borderRadius="full" bg={item.color} />
          </Box>
        ))}
      </SimpleGrid>

      <HStack spacing="10px" mb="22px" overflowX="auto" pb="4px">
        {["Semua", "Makanan", "Minuman"].map((cat) => (
          <Tag
            key={cat}
            size="lg"
            borderRadius="full"
            cursor="pointer"
            px="18px"
            py="10px"
            bg={filterKategori === cat ? "orange.400" : cardBg}
            color={filterKategori === cat ? "white" : textColor}
            border="1px solid"
            borderColor={filterKategori === cat ? "orange.400" : borderColor}
            boxShadow={filterKategori === cat ? "0 10px 24px rgba(251,146,60,.25)" : "none"}
            onClick={() => setFilterKategori(cat)}
          >
            <TagLabel fontWeight="800">{cat}</TagLabel>
          </Tag>
        ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="22px">
        {filteredMenu.map((item) => (
          <Box
            key={item.id}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="32px"
            overflow="hidden"
            boxShadow="0 20px 50px rgba(15,23,42,0.08)"
            _hover={{ transform: "translateY(-5px)" }}
            transition="all .25s ease"
          >
            <Box h="190px" bg={softBg} position="relative">
              {item.image ? (
                <Image src={item.image} w="100%" h="100%" objectFit="cover" />
              ) : (
                <Flex
                  w="100%"
                  h="100%"
                  align="center"
                  justify="center"
                  direction="column"
                  color="orange.300"
                >
                  <MdPhotoSizeSelectActual size="46px" />
                  <Text fontSize="sm" mt="2" fontWeight="800">
                    Tanpa Foto
                  </Text>
                </Flex>
              )}

              <Badge
                position="absolute"
                top="14px"
                right="14px"
                colorScheme={item.status === "Tersedia" ? "green" : "red"}
                borderRadius="full"
                px="12px"
                py="6px"
                boxShadow="lg"
              >
                {item.status}
              </Badge>
            </Box>

            <Box p="22px">
              <Flex justify="space-between" align="start" gap="12px" mb="18px">
                <Box>
                  <Text fontWeight="900" color={textColor} fontSize="lg">
                    {item.name}
                  </Text>
                  <Badge
                    colorScheme={categoryColor[item.kategori]}
                    variant="subtle"
                    borderRadius="full"
                    px="10px"
                    mt="8px"
                  >
                    {item.kategori}
                  </Badge>
                </Box>

                <Text fontWeight="900" color="orange.400" fontSize="lg">
                  {formatIDR(item.harga)}
                </Text>
              </Flex>

              <Flex justify="flex-end">
                <HStack>
                  <IconButton
                    size="md"
                    icon={<MdEdit />}
                    borderRadius="16px"
                    bg="orange.50"
                    color="orange.500"
                    _hover={{ bg: "orange.100" }}
                    onClick={() => handleOpenForm(item)}
                  />
                  <IconButton
                    size="md"
                    icon={<MdDeleteOutline />}
                    borderRadius="16px"
                    bg="red.50"
                    color="red.400"
                    _hover={{ bg: "red.100" }}
                    onClick={() => confirmDelete(item)}
                  />
                </HStack>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent borderRadius="30px" bg={cardBg} p="6px">
          <ModalHeader color={textColor} fontWeight="900">
            {currentEdit ? "Edit Menu" : "Tambah Menu"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb="4">
              <FormLabel fontWeight="800">Foto Menu</FormLabel>
              <Input
                type="file"
                p="1"
                accept="image/*"
                borderRadius="16px"
                onChange={handleFileChange}
              />
              {formData.image && (
                <Image
                  src={formData.image}
                  mt="3"
                  borderRadius="18px"
                  h="120px"
                  w="100%"
                  objectFit="cover"
                />
              )}
            </FormControl>

            <FormControl mb="4">
              <FormLabel fontWeight="800">Nama Menu</FormLabel>
              <Input
                borderRadius="16px"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel fontWeight="800">Harga</FormLabel>
              <Input
                borderRadius="16px"
                type="number"
                value={formData.harga}
                onChange={(e) =>
                  setFormData({ ...formData, harga: e.target.value })
                }
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <FormControl>
                <FormLabel fontWeight="800">Kategori</FormLabel>
                <Select
                  borderRadius="16px"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                >
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="800">Status</FormLabel>
                <Select
                  borderRadius="16px"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Habis">Habis</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button borderRadius="16px" onClick={onFormClose}>
              Batal
            </Button>
            <Button
              bg="orange.400"
              color="white"
              borderRadius="16px"
              ml={3}
              _hover={{ bg: "orange.500" }}
              onClick={handleSave}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(8px)">
          <AlertDialogContent borderRadius="28px">
            <AlertDialogHeader fontWeight="900">Hapus Menu</AlertDialogHeader>
            <AlertDialogBody>
              Yakin ingin menghapus menu{" "}
              <b>{deleteTarget?.name}</b>?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} borderRadius="16px" onClick={onAlertClose}>
                Batal
              </Button>
              <Button
                colorScheme="red"
                borderRadius="16px"
                onClick={handleDelete}
                ml={3}
              >
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}