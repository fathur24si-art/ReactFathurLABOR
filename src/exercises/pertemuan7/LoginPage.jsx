import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdPerson, MdLock } from "react-icons/md";
import axios from "axios";
import GlareHover from "./GlareHover.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password harus diisi.");
      return;
    }

    // Validasi email mudah (hanya contoh untuk aplikasi ini)
    if (email !== "admin@resto.com" || password !== "admin123") {
      setError("Email atau password salah! Gunakan akun demo.");
      return;
    }

    setIsLoading(true);

    try {

      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        email: email.trim(),
        password: password.trim(),
        // simulasi token request
        action: "login"
      });


      if (response.status === 201) {

        localStorage.setItem("adminToken", "mock-token-admin-12345");
        navigate("/admin/beranda");
      }
    } catch (err) {
      setError("Gagal melakukan login. Periksa koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="100%" display="flex" justifyContent="center">
      <Box w="100%" style={{ perspective: "1000px" }}>
        <GlareHover
          width="100%"
          background="#ffffff"
          borderRadius="24px"
          borderColor="#edf2f7"
          glareColor="#3182ce"
          glareOpacity={0.15}
          glareAngle={-30}
          glareSize={250}
          transitionDuration={600}
        >
          <Box p={{ base: "8", md: "10" }} w="100%">
            <form onSubmit={handleSubmit}>
              <VStack spacing="5" align="stretch">
                {error && (
                  <Box
                    p="3"
                    bg="red.50"
                    color="red.600"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="red.200"
                    textAlign="center"
                    fontSize="sm"
                  >
                    {error}
                  </Box>
                )}

                <FormControl>
                  <FormLabel color="gray.700" ms="1" fontSize="sm" fontWeight="600">
                    Email Pengguna
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h="100%">
                      <Icon as={MdPerson} color="gray.400" w="5" h="5" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email (contoh: admin@resto.com)"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      color="gray.800"
                      _placeholder={{ color: "gray.400" }}
                      _hover={{ borderColor: "blue.300" }}
                      _focus={{
                        bg: "white",
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182ce",
                      }}
                      borderRadius="16px"
                      h="50px"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.700" ms="1" fontSize="sm" fontWeight="600">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h="100%">
                      <Icon as={MdLock} color="gray.400" w="5" h="5" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      color="gray.800"
                      _placeholder={{ color: "gray.400" }}
                      _hover={{ borderColor: "blue.300" }}
                      _focus={{
                        bg: "white",
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182ce",
                      }}
                      borderRadius="16px"
                      h="50px"
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  h="50px"
                  borderRadius="16px"
                  fontWeight="bold"
                  isLoading={isLoading}
                  loadingText="Memproses..."
                  _hover={{ bg: "blue.600", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(0px)" }}
                  boxShadow="0px 8px 15px rgba(49, 130, 206, 0.25)"
                  mt="4"
                  transition="all 0.2s"
                >
                  Masuk ke Dashboard
                </Button>
              </VStack>
            </form>

            <Box mt="8" pt="6" borderTop="1px solid" borderColor="gray.100" textAlign="center">
              <Text fontSize="sm" color="gray.500">
                Gunakan <Text as="span" color="blue.500" fontWeight="bold">admin@resto.com</Text> /{" "}
                <Text as="span" color="blue.500" fontWeight="bold">admin123</Text> untuk masuk.
              </Text>
            </Box>
          </Box>
        </GlareHover>
      </Box>
    </Box>
  );
};

export default LoginPage;
