import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Spinner,
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
  Textarea,
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
  HStack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  Image,
} from "@chakra-ui/react";
import PageHeader from "components/pageHeader/PageHeader.jsx";
import PrimaryButton from "components/ui/PrimaryButton.jsx";
import PanelCard from "components/ui/PanelCard.jsx";
import { supabase } from "../../../../utils/supabase.js";
import {
  MdAdd,
  MdSearch,
  MdDeleteOutline,
  MdEdit,
  MdPhotoSizeSelectActual,
  MdVisibility,
} from "react-icons/md";

const defaultMenuItems = [
  {
    id: 1,
    name: "Nasi Goreng Rustaf",
    harga: "35000",
    deskripsi: "Nasi goreng spesial dengan telur, ayam, dan sayuran.",
    image: "",
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    harga: "45000",
    deskripsi: "Ayam bakar dengan saus madu manis dan wangi.",
    image: "",
  },
  {
    id: 3,
    name: "Es Teh Manis",
    harga: "8000",
    deskripsi: "Teh manis dingin untuk menyegarkan hari Anda.",
    image: "",
  },
  {
    id: 4,
    name: "Jus Alpukat",
    harga: "15000",
    deskripsi: "Jus alpukat creamy dengan sedikit gula dan susu.",
    image: "",
  },
  {
    id: 5,
    name: "Sate Ayam 10 Tusuk",
    harga: "30000",
    deskripsi: "Sate ayam lezat dengan bumbu kacang khas restoran.",
    image: "",
  },
  {
    id: 6,
    name: "Kopi Hitam",
    harga: "12000",
    deskripsi: "Kopi hitam murni dengan aroma panggang yang pekat.",
    image: "",
  },
];

export default function MenuMakanan() {
  const [menu, setMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

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

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

  const cancelRef = useRef();
  const toast = useToast();

  const [currentEdit, setCurrentEdit] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    harga: "",
    deskripsi: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageColumn, setImageColumn] = useState(
    import.meta.env.VITE_SUPABASE_MENU_IMAGE_COLUMN || "image"
  );

  const MENU_TABLE = import.meta.env.VITE_SUPABASE_MENU_TABLE || "menu";

  const isMissingColumnError = (error, column) => {
    const msg = error?.message?.toLowerCase() || "";
    return (
      msg.includes(`column \"${column}\"`) ||
      msg.includes(`column '${column}'`) ||
      msg.includes(`column ${column}`) ||
      msg.includes(`could not find the '${column}' column`) ||
      msg.includes(`could not find the \"${column}\" column`)
    );
  };

  const buildMenuPayload = () => {
    const payload = {
      nama: formData.name,
      harga: Number(formData.harga) || 0,
      deskripsi: formData.deskripsi,
    };

    if (formData.image && imageColumn) {
      payload[imageColumn] = formData.image;
    }

    return payload;
  };

  const isMissingTableError = (error) => {
    const msg = error?.message?.toLowerCase() || "";
    return (
      msg.includes("could not find the table") ||
      msg.includes(`relation \"public.${MENU_TABLE}\"`.toLowerCase()) ||
      msg.includes(`table 'public.${MENU_TABLE}'`) ||
      error?.code === "42P01"
    );
  };

  const isRowLevelSecurityError = (error) => {
    const msg = error?.message?.toLowerCase() || "";
    return (
      msg.includes("row-level security") ||
      msg.includes("policy") ||
      msg.includes("permission denied") ||
      msg.includes("abort due to policy")
    );
  };

  const fetchMenuItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from(MENU_TABLE)
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase fetch menu error:", error);
      const message = isMissingTableError(error)
        ? `Tabel Supabase '${MENU_TABLE}' tidak ditemukan. Pastikan tabel ada dan/atau set VITE_SUPABASE_MENU_TABLE di .env.`
        : isRowLevelSecurityError(error)
        ? `Row-level security aktif. Buat policy SELECT untuk tabel '${MENU_TABLE}' di Supabase atau gunakan user yang diizinkan.`
        : "Tidak bisa mengambil data menu dari Supabase.";
      toast({
        title: "Supabase error",
        description: message,
        status: "warning",
      });
      setMenu(defaultMenuItems);
    } else if (data) {
      setMenu(
        data.map((item) => ({
          id: item.id,
          name: item.nama ?? "",
          harga: item.harga?.toString() ?? "",
          deskripsi: item.deskripsi ?? "",
          image: item.image ?? item.gambar ?? "",
        }))
      );
    }

    setHasFetched(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMenuItems();

    const handleFocus = () => {
      fetchMenuItems();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [MENU_TABLE]);

  const pageBg = useColorModeValue("#F8FAFC", "#0F172A");
  const cardBg = useColorModeValue("rgba(255,255,255,0.92)", "rgba(15,23,42,0.86)");
  const softBg = useColorModeValue("orange.50", "whiteAlpha.100");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  const filteredMenu = menu.filter((item) => {
    const text = `${item.name} ${item.deskripsi}`.toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  const stats = {
    total: menu.length,
  };

  const handleOpenForm = (item = null) => {
    if (item) {
      setCurrentEdit(item.id);
      setFormData({
        name: item.name,
        harga: item.harga,
        deskripsi: item.deskripsi,
        image: item.image || "",
      });
    } else {
      setCurrentEdit(null);
      setFormData({
        name: "",
        harga: "",
        deskripsi: "",
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

  const handleSave = async () => {
    if (!formData.name || !formData.harga) {
      toast({
        title: "Error",
        description: "Lengkapi data!",
        status: "error",
      });
      return;
    }

    const payload = buildMenuPayload();

    if (currentEdit) {
      let { error } = await supabase
        .from(MENU_TABLE)
        .update(payload)
        .eq("id", currentEdit);

      if (
        error &&
        formData.image &&
        imageColumn &&
        isMissingColumnError(error, imageColumn)
      ) {
        const fallbackColumn = imageColumn === "image" ? "gambar" : "image";
        setImageColumn(fallbackColumn);
        const retryPayload = buildMenuPayload();
        const retry = await supabase
          .from(MENU_TABLE)
          .update(retryPayload)
          .eq("id", currentEdit);
        error = retry.error;
      }

      if (error) {
        const message = isRowLevelSecurityError(error)
          ? `Row-level security aktif. Pastikan INSERT/UPDATE policy di tabel '${MENU_TABLE}' sudah dibuat pada Supabase.`
          : error.message;
        toast({
          title: "Error Supabase",
          description: message,
          status: "error",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Menu diperbarui.",
        status: "success",
      });
    } else {
      let { error } = await supabase.from(MENU_TABLE).insert([payload]);

      if (
        error &&
        formData.image &&
        imageColumn &&
        isMissingColumnError(error, imageColumn)
      ) {
        const fallbackColumn = imageColumn === "image" ? "gambar" : "image";
        setImageColumn(fallbackColumn);
        const retryPayload = buildMenuPayload();
        const retry = await supabase.from(MENU_TABLE).insert([retryPayload]);
        error = retry.error;
      }

      if (error) {
        const message = isRowLevelSecurityError(error)
          ? `Row-level security aktif. Pastikan INSERT/UPDATE policy di tabel '${MENU_TABLE}' sudah dibuat pada Supabase.`
          : error.message;
        toast({
          title: "Error Supabase",
          description: message,
          status: "error",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Menu baru ditambahkan.",
        status: "success",
      });
    }

    await fetchMenuItems();
    onFormClose();
  };

  const confirmDelete = (item) => {
    setDeleteTarget(item);
    onAlertOpen();
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from(MENU_TABLE)
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      const message = isMissingTableError(error)
        ? `Tabel Supabase '${MENU_TABLE}' tidak ditemukan. Periksa konfigurasi .env atau nama tabel.`
        : isRowLevelSecurityError(error)
        ? `Row-level security aktif. Pastikan DELETE policy di tabel '${MENU_TABLE}' sudah dibuat pada Supabase.`
        : error.message;
      toast({
        title: "Error Supabase",
        description: message,
        status: "error",
      });
      return;
    }

    await fetchMenuItems();
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

  const openDetail = (item) => {
    setDetailItem(item);
    onDetailOpen();
  };

  const closeDetail = () => {
    onDetailClose();
    setDetailItem(null);
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

          <PrimaryButton
            leftIcon={<MdAdd />}
            bg="orange.400"
            color="white"
            h="46px"
            onClick={() => handleOpenForm()}
          >
            Tambah Menu
          </PrimaryButton>
        </Flex>
      </PageHeader>

      {isLoading && !hasFetched ? (
        <Flex align="center" justify="center" minH="240px" mb="22px">
          <Spinner size="xl" color="orange.400" />
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="22px">
        {[{ label: "Total Menu", value: stats.total, color: "orange.400" }].map(
          (item, index) => (
            <PanelCard
              key={index}
              bg={cardBg}
              borderColor={borderColor}
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
            </PanelCard>
          )
        )}
      </SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="22px">
        {filteredMenu.map((item) => (
          <PanelCard
            key={item.id}
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="0 20px 50px rgba(15,23,42,0.08)"
            overflow="hidden"
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

            </Box>

            <Box p="22px">
              <Text fontWeight="900" color={textColor} fontSize="lg" mb="4">
                {item.name}
              </Text>
              <Text color={subTextColor} mb="18px" noOfLines={2}>
                {item.deskripsi}
              </Text>
              <Text fontWeight="900" color="orange.400" fontSize="lg" mb="18px">
                {formatIDR(item.harga)}
              </Text>

              <Flex justify="space-between" align="center" wrap="wrap" gap="10px">
                <Button
                  size="sm"
                  leftIcon={<MdVisibility />}
                  variant="ghost"
                  colorScheme="orange"
                  borderRadius="14px"
                  fontWeight="800"
                  onClick={() => openDetail(item)}
                >
                  Lihat detail
                </Button>
                <HStack>
                  <IconButton
                    size="md"
                    icon={<MdEdit />}
                    borderRadius="16px"
                    bg="orange.50"
                    color="orange.500"
                    _hover={{ bg: "orange.100" }}
                    aria-label="Edit menu"
                    onClick={() => handleOpenForm(item)}
                  />
                  <IconButton
                    size="md"
                    icon={<MdDeleteOutline />}
                    borderRadius="16px"
                    bg="red.50"
                    color="red.400"
                    _hover={{ bg: "red.100" }}
                    aria-label="Hapus menu"
                    onClick={() => confirmDelete(item)}
                  />
                </HStack>
              </Flex>
            </Box>
          </PanelCard>
        ))}
      </SimpleGrid>
        </>
      )}

      <Modal isOpen={isDetailOpen} onClose={closeDetail} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent borderRadius="30px" bg={cardBg} overflow="hidden" mx="14px">
          <ModalHeader color={textColor} fontWeight="900" pb="0">
            Detail menu
          </ModalHeader>
          <ModalCloseButton onClick={closeDetail} />

          <ModalBody pb="6">
            {detailItem && (
              <>
                <Box
                  h="220px"
                  bg={softBg}
                  borderRadius="22px"
                  overflow="hidden"
                  mb="5"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  {detailItem.image ? (
                    <Image
                      src={detailItem.image}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      alt={detailItem.name}
                    />
                  ) : (
                    <Flex
                      w="100%"
                      h="100%"
                      align="center"
                      justify="center"
                      direction="column"
                      color="orange.300"
                    >
                      <MdPhotoSizeSelectActual size="48px" />
                      <Text fontSize="sm" mt="2" fontWeight="800">
                        Belum ada foto
                      </Text>
                    </Flex>
                  )}
                </Box>

                <Text fontWeight="900" color={textColor} fontSize="xl" mb="2">
                  {detailItem.name}
                </Text>

                <Text color={subTextColor} mb="5">
                  {detailItem.deskripsi}
                </Text>

                <Divider borderColor={borderColor} mb="5" />

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  <Box>
                    <Text fontSize="xs" fontWeight="800" color={subTextColor} textTransform="uppercase" letterSpacing="wider">
                      Harga jual
                    </Text>
                    <Text fontWeight="900" color="orange.400" fontSize="2xl" mt="1">
                      {formatIDR(detailItem.harga)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="800" color={subTextColor} textTransform="uppercase" letterSpacing="wider">
                      ID menu
                    </Text>
                    <Text fontWeight="800" color={textColor} fontSize="lg" mt="1">
                      #{detailItem.id}
                    </Text>
                  </Box>
                </SimpleGrid>
              </>
            )}
          </ModalBody>

          <ModalFooter pt="0">
            <Button borderRadius="16px" bg="orange.400" color="white" _hover={{ bg: "orange.500" }} onClick={closeDetail}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

            <FormControl mb="4">
              <FormLabel fontWeight="800">Deskripsi</FormLabel>
              <Textarea
                borderRadius="16px"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <PrimaryButton variant="outline" onClick={onFormClose}>
              Batal
            </PrimaryButton>
            <PrimaryButton
              bg="orange.400"
              color="white"
              ml={3}
              _hover={{ bg: "orange.500" }}
              onClick={handleSave}
            >
              Simpan
            </PrimaryButton>
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
              <PrimaryButton variant="outline" ref={cancelRef} onClick={onAlertClose}>
                Batal
              </PrimaryButton>
              <PrimaryButton
                colorScheme="red"
                bg="red.400"
                color="white"
                ml={3}
                _hover={{ bg: "red.500" }}
                onClick={handleDelete}
              >
                Hapus
              </PrimaryButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}