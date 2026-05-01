import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, FormControl, FormLabel, Input,
    InputGroup, InputLeftElement, Icon, Text, VStack, Heading, Flex,
} from "@chakra-ui/react";
import { MdPerson, MdLock, MdRestaurant } from "react-icons/md";
import axios from "axios";
import GlareHover from "../../pertemuan 7/GlareHover.jsx";

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
        <Box w="100%" maxW="420px" mx="auto" style={{ perspective: "1200px" }}>
            <GlareHover
                width="100%"
                background="rgba(255, 255, 255, 0.65)"
                borderRadius="32px"
                borderColor="rgba(255, 255, 255, 0.8)"
                glareColor="#ffffff"
                glareOpacity={0.4}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={700}
                style={{
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0px 30px 60px rgba(15, 23, 42, 0.08), inset 0px 1px 0px rgba(255,255,255,1)",
                }}
            >
                <Box p={{ base: "8", md: "10" }} w="100%">
                    {/* Header */}
                    <Flex direction="column" align="center" mb="8">
                        <Flex align="center" justify="center" w="64px" h="64px" rounded="2xl"
                            bgGradient="linear(to-br, blue.500, blue.700)" mb="5"
                            boxShadow="0px 12px 24px rgba(49,130,206,0.35)">
                            <Icon as={MdRestaurant} w="28px" h="28px" color="white" />
                        </Flex>
                        <Heading color="gray.900" fontSize="2xl" fontWeight="800" letterSpacing="-0.02em" mb="2">
                            Admin Portal
                        </Heading>
                        <Text color="gray.500" fontSize="sm" fontWeight="500">
                            Akses dashboard manajemen restoran
                        </Text>
                    </Flex>

                    <form onSubmit={handleSubmit}>
                        <VStack spacing="5" align="stretch">
                            {/* ✅ Tampilkan error jika ada */}
                            {error && (
                                <Box p="3" bg="red.50" color="red.600" borderRadius="xl"
                                    border="1px solid" borderColor="red.200" textAlign="center"
                                    fontSize="sm" fontWeight="500">
                                    {error}
                                </Box>
                            )}

                            {/* ✅ Field Username (sesuai endpoint DummyJSON) */}
                            <FormControl>
                                <FormLabel color="gray.700" ms="1" fontSize="xs" fontWeight="700"
                                    textTransform="uppercase" letterSpacing="wider">
                                    Username
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" h="100%">
                                        <Icon as={MdPerson} color="gray.400" w="5" h="5" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="username"
                                        value={dataForm.username}
                                        onChange={handleChange}
                                        placeholder="emilys"
                                        bg="rgba(255,255,255,0.8)" border="1px solid"
                                        borderColor="gray.200" color="gray.900" fontWeight="500"
                                        _placeholder={{ color: "gray.400" }}
                                        _hover={{ borderColor: "blue.300", bg: "white" }}
                                        _focus={{ bg: "white", borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(49,130,206,0.15)" }}
                                        borderRadius="16px" h="52px" transition="all 0.2s"
                                    />
                                </InputGroup>
                            </FormControl>

                            {/* ✅ Field Password */}
                            <FormControl>
                                <FormLabel color="gray.700" ms="1" fontSize="xs" fontWeight="700"
                                    textTransform="uppercase" letterSpacing="wider">
                                    Kata Sandi
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" h="100%">
                                        <Icon as={MdLock} color="gray.400" w="5" h="5" />
                                    </InputLeftElement>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={dataForm.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        bg="rgba(255,255,255,0.8)" border="1px solid"
                                        borderColor="gray.200" color="gray.900" fontWeight="500"
                                        _placeholder={{ color: "gray.400", letterSpacing: "2px" }}
                                        _hover={{ borderColor: "blue.300", bg: "white" }}
                                        _focus={{ bg: "white", borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(49,130,206,0.15)" }}
                                        borderRadius="16px" h="52px" letterSpacing="2px" transition="all 0.2s"
                                    />
                                </InputGroup>
                            </FormControl>

                            {/* ✅ Tombol submit dengan loading state */}
                            <Button type="submit" bg="gray.900" color="white" h="52px" borderRadius="16px"
                                fontWeight="700" fontSize="md" isLoading={loading} loadingText="Memverifikasi..."
                                _hover={{ bg: "black", transform: "translateY(-2px)", boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                                _active={{ bg: "gray.800", transform: "translateY(0px)" }}
                                mt="4" transition="all 0.3s cubic-bezier(0.4,0,0.2,1)">
                                Masuk
                            </Button>
                        </VStack>
                    </form>

                    {/* Hint akun demo */}
                    <Box mt="8" pt="6" borderTop="1px solid" borderColor="rgba(0,0,0,0.05)" textAlign="center">
                        <Text fontSize="xs" color="gray.500" fontWeight="500">
                            Demo:{" "}
                            <Text as="span" color="gray.800" fontWeight="700">emilys</Text>
                            {" / "}
                            <Text as="span" color="gray.800" fontWeight="700">emilyspass</Text>
                        </Text>
                    </Box>
                </Box>
            </GlareHover>
        </Box>
    );
}
