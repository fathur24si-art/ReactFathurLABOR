import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, FormControl, FormLabel, Input,
    InputGroup, InputLeftElement, Icon, Text, VStack, Heading, Flex,
} from "@chakra-ui/react";
import { MdPerson, MdLock, MdRestaurant } from "react-icons/md";
import axios from "axios";
import GlareHover from "../../exercises/pertemuan7/GlareHover.jsx";

const API_URL = "https://dummyjson.com/auth/login";

export default function Login() {
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { username, password } = dataForm;

        if (!username || !password) {
            setError("Username dan password harus diisi.");
            return;
        }


        setLoading(true);
        //Ini untuk kirim data API
        try {
            const response = await axios.post(API_URL, {
                username,
                password,
                expiresInMins: 30,
            });


            localStorage.setItem("adminToken", response.data.accessToken);
            localStorage.setItem("adminUser", JSON.stringify(response.data));

            navigate("/admin/beranda");

        } catch (err) {

            if (err.response?.status === 400) {
                setError("Username atau password salah.");
            } else {
                setError("Koneksi gagal. Silakan coba lagi.");
            }
        } finally {

            setLoading(false);
        }
    };

return (
  <Box w="100%" maxW="430px" mx="auto" style={{ perspective: "1200px" }}>
    <GlareHover
      width="100%"
      background="linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,247,237,0.78))"
      borderRadius="36px"
      borderColor="rgba(255,255,255,0.9)"
      glareColor="#ffffff"
      glareOpacity={0.45}
      glareAngle={-45}
      glareSize={260}
      transitionDuration={700}
      style={{
        backdropFilter: "blur(26px)",
        WebkitBackdropFilter: "blur(26px)",
        boxShadow:
          "0px 28px 70px rgba(15,23,42,0.14), inset 0px 1px 0px rgba(255,255,255,1)",
      }}
    >
      <Box p={{ base: "8", md: "10" }} w="100%" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="-70px"
          right="-70px"
          w="180px"
          h="180px"
          rounded="full"
          bg="orange.200"
          opacity="0.5"
          filter="blur(8px)"
        />

        <Flex direction="column" align="center" mb="8" position="relative">
          <Flex
            align="center"
            justify="center"
            w="70px"
            h="70px"
            rounded="26px"
            bgGradient="linear(to-br, orange.300, orange.500)"
            mb="5"
            boxShadow="0px 16px 30px rgba(251,146,60,0.38)"
          >
            <Icon as={MdRestaurant} w="32px" h="32px" color="white" />
          </Flex>

          <Heading color="gray.900" fontSize="3xl" fontWeight="900" mb="2">
            Resto Rustaf
          </Heading>

          <Text color="gray.500" fontSize="sm" fontWeight="600" textAlign="center">
            Masuk ke dashboard manajemen restoran
          </Text>
        </Flex>

        <form onSubmit={handleSubmit}>
          <VStack spacing="5" align="stretch">
            {error && (
              <Box
                p="4"
                bg="red.50"
                color="red.500"
                borderRadius="18px"
                border="1px solid"
                borderColor="red.100"
                textAlign="center"
                fontSize="sm"
                fontWeight="700"
              >
                {error}
              </Box>
            )}

            <FormControl>
              <FormLabel
                color="gray.700"
                ms="1"
                fontSize="xs"
                fontWeight="900"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%">
                  <Icon as={MdPerson} color="orange.400" w="5" h="5" />
                </InputLeftElement>
                <Input
                  type="text"
                  name="username"
                  value={dataForm.username}
                  onChange={handleChange}
                  placeholder="emilys"
                  bg="white"
                  border="1px solid"
                  borderColor="orange.100"
                  color="gray.900"
                  fontWeight="700"
                  borderRadius="18px"
                  h="54px"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "orange.300" }}
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 4px rgba(251,146,60,0.16)",
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel
                color="gray.700"
                ms="1"
                fontSize="xs"
                fontWeight="900"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Kata Sandi
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%">
                  <Icon as={MdLock} color="orange.400" w="5" h="5" />
                </InputLeftElement>
                <Input
                  type="password"
                  name="password"
                  value={dataForm.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  bg="white"
                  border="1px solid"
                  borderColor="orange.100"
                  color="gray.900"
                  fontWeight="700"
                  borderRadius="18px"
                  h="54px"
                  letterSpacing="2px"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "orange.300" }}
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 4px rgba(251,146,60,0.16)",
                  }}
                />
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              bgGradient="linear(to-r, orange.400, orange.500)"
              color="white"
              h="56px"
              borderRadius="20px"
              fontWeight="900"
              fontSize="md"
              isLoading={loading}
              loadingText="Memverifikasi..."
              boxShadow="0px 16px 30px rgba(251,146,60,0.35)"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0px 22px 38px rgba(251,146,60,0.45)",
              }}
              _active={{ transform: "translateY(0px)" }}
              mt="4"
            >
              Masuk
            </Button>
          </VStack>
        </form>

        <Box
          mt="8"
          pt="6"
          borderTop="1px solid"
          borderColor="orange.100"
          textAlign="center"
        >
          <Text fontSize="xs" color="gray.500" fontWeight="600">
            Demo:{" "}
            <Text as="span" color="orange.500" fontWeight="900">
              emilys
            </Text>
            {" / "}
            <Text as="span" color="orange.500" fontWeight="900">
              emilyspass
            </Text>
          </Text>
        </Box>
      </Box>
    </GlareHover>
  </Box>
);
}
