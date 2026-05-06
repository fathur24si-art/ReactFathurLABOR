import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const ErrorView = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const bgPage = useColorModeValue(
    "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #ffffff 100%)",
    "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)"
  );

  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.88)",
    "rgba(15,23,42,0.88)"
  );

  const textMain = useColorModeValue("gray.900", "white");
  const textMuted = useColorModeValue("gray.500", "gray.300");

  const borderColor = useColorModeValue(
    "rgba(255,255,255,0.9)",
    "rgba(255,255,255,0.08)"
  );

  const monitorErrorImg =
    "https://cdn-icons-png.flaticon.com/512/595/595067.png";

  const errorDetails = {
    "400": {
      title: "Bad Request",
      color: "orange",
      description:
        "Permintaan yang Anda kirim tidak dapat diproses oleh server.",
    },
    "401": {
      title: "Unauthorized",
      color: "red",
      description:
        "Anda tidak memiliki izin untuk mengakses halaman ini.",
    },
    "403": {
      title: "Forbidden",
      color: "purple",
      description:
        "Akses menuju halaman ini dibatasi oleh sistem.",
    },
    "404": {
      title: "Page Not Found",
      color: "blue",
      description:
        "Halaman yang Anda cari tidak ditemukan di server Resto Rustaf.",
    },
    "500": {
      title: "Internal Server Error",
      color: "red",
      description:
        "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.",
    },
  };

  const currentError = errorDetails[code] || errorDetails["404"];

  return (
    <Flex
      minH="100vh"
      bg={bgPage}
      align="center"
      justify="center"
      px="20px"
      position="relative"
      overflow="hidden"
    >
      {/* Blur Circle */}
      <Box
        position="absolute"
        top="-120px"
        right="-120px"
        w="320px"
        h="320px"
        borderRadius="full"
        bg="orange.300"
        opacity="0.15"
        filter="blur(60px)"
      />

      <Box
        position="absolute"
        bottom="-120px"
        left="-120px"
        w="320px"
        h="320px"
        borderRadius="full"
        bg="blue.300"
        opacity="0.15"
        filter="blur(60px)"
      />

      <Box
        maxW="620px"
        w="100%"
        bg={cardBg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="36px"
        p={{ base: "28px", md: "42px" }}
        boxShadow="0 25px 60px rgba(15,23,42,0.12)"
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* floating decoration */}
        <Box
          position="absolute"
          top="-40px"
          right="-40px"
          w="140px"
          h="140px"
          borderRadius="full"
          bg={`${currentError.color}.300`}
          opacity="0.12"
        />

        <VStack spacing="24px">
          <Badge
            colorScheme={currentError.color}
            px="16px"
            py="8px"
            borderRadius="full"
            fontSize="12px"
            fontWeight="800"
            textTransform="uppercase"
            letterSpacing="1px"
          >
            Error {code || "404"}
          </Badge>

          <Image
            src={monitorErrorImg}
            alt="error"
            w={{ base: "180px", md: "240px" }}
            dropShadow="0 20px 30px rgba(0,0,0,0.15)"
          />

          <Heading
            fontSize={{ base: "42px", md: "72px" }}
            lineHeight="1"
            fontWeight="900"
            bgGradient={`linear(to-r, ${currentError.color}.400, ${currentError.color}.600)`}
            bgClip="text"
          >
            {code || "404"}
          </Heading>

          <Heading
            size="lg"
            color={textMain}
            fontWeight="900"
          >
            {currentError.title}
          </Heading>

          <Text
            color={textMuted}
            fontSize="md"
            maxW="460px"
            lineHeight="1.8"
            fontWeight="500"
          >
            {currentError.description}
          </Text>

          <Flex gap="14px" pt="10px" flexWrap="wrap" justify="center">
            <Button
              leftIcon={<MdArrowBack />}
              bg="orange.400"
              color="white"
              px="28px"
              h="54px"
              borderRadius="20px"
              fontWeight="800"
              fontSize="15px"
              boxShadow="0 12px 24px rgba(251,146,60,0.35)"
              _hover={{
                bg: "orange.500",
                transform: "translateY(-2px)",
                boxShadow: "0 18px 32px rgba(251,146,60,0.45)",
              }}
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>

            <Button
              variant="outline"
              borderWidth="2px"
              borderColor="gray.200"
              px="28px"
              h="54px"
              borderRadius="20px"
              fontWeight="800"
              fontSize="15px"
              _hover={{
                bg: useColorModeValue("gray.50", "whiteAlpha.100"),
              }}
              onClick={() => navigate("/admin/default")}
            >
              Dashboard
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ErrorView;