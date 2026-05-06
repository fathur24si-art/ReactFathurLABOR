import React, { useState } from "react";
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
    Heading,
    Flex,
    Link,
} from "@chakra-ui/react";
import { MdEmail, MdLock, MdPersonAdd } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export default function Register() {
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulasi register - bisa ditambahkan logic API
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <Box w="100%" maxW="420px" mx="auto">
            <VStack spacing={6} align="stretch">
                <Flex direction="column" align="center" mb="4">
                    <Flex align="center" justify="center" w="64px" h="64px" rounded="2xl"
                        bgGradient="linear(to-br, green.500, green.700)" mb="5"
                        boxShadow="0px 12px 24px rgba(49, 130, 206, 0.35)">
                        <Icon as={MdPersonAdd} w="28px" h="28px" color="white" />
                    </Flex>
                    <Heading color="gray.900" fontSize="2xl" fontWeight="800" letterSpacing="-0.02em" mb="2">
                        Buat Akun
                    </Heading>
                    <Text color="gray.500" fontSize="sm" fontWeight="500">
                        Daftar untuk mengakses dashboard
                    </Text>
                </Flex>

                <form onSubmit={handleSubmit}>
                    <VStack spacing="5" align="stretch">
                        <FormControl>
                            <FormLabel color="gray.700" ms="1" fontSize="xs" fontWeight="700"
                                textTransform="uppercase" letterSpacing="wider">
                                Email
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" h="100%">
                                    <Icon as={MdEmail} color="gray.400" w="5" h="5" />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    bg="rgba(255,255,255,0.8)" border="1px solid"
                                    borderColor="gray.200" color="gray.900" fontWeight="500"
                                    _placeholder={{ color: "gray.400" }}
                                    _hover={{ borderColor: "green.300", bg: "white" }}
                                    _focus={{ bg: "white", borderColor: "green.500", boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.15)" }}
                                    borderRadius="16px" h="52px" transition="all 0.2s"
                                />
                            </InputGroup>
                        </FormControl>

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
                                    _hover={{ borderColor: "green.300", bg: "white" }}
                                    _focus={{ bg: "white", borderColor: "green.500", boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.15)" }}
                                    borderRadius="16px" h="52px" letterSpacing="2px" transition="all 0.2s"
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="gray.700" ms="1" fontSize="xs" fontWeight="700"
                                textTransform="uppercase" letterSpacing="wider">
                                Konfirmasi Kata Sandi
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" h="100%">
                                    <Icon as={MdLock} color="gray.400" w="5" h="5" />
                                </InputLeftElement>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={dataForm.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    bg="rgba(255,255,255,0.8)" border="1px solid"
                                    borderColor="gray.200" color="gray.900" fontWeight="500"
                                    _placeholder={{ color: "gray.400", letterSpacing: "2px" }}
                                    _hover={{ borderColor: "green.300", bg: "white" }}
                                    _focus={{ bg: "white", borderColor: "green.500", boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.15)" }}
                                    borderRadius="16px" h="52px" letterSpacing="2px" transition="all 0.2s"
                                />
                            </InputGroup>
                        </FormControl>

                        <Button type="submit" bg="green.500" color="white" h="52px" borderRadius="16px"
                            fontWeight="700" fontSize="md" isLoading={loading} loadingText="Mendaftar..."
                            _hover={{ bg: "green.600", transform: "translateY(-2px)", boxShadow: "0px 10px 20px rgba(72, 187, 120, 0.3)" }}
                            _active={{ bg: "green.700", transform: "translateY(0px)" }}
                            mt="4" transition="all 0.3s cubic-bezier(0.4,0,0.2,1)">
                            Daftar
                        </Button>
                    </VStack>
                </form>

                <Box mt="6" pt="6" borderTop="1px solid" borderColor="rgba(0,0,0,0.05)" textAlign="center">
                    <Text fontSize="sm" color="gray.500" fontWeight="500">
                        Sudah punya akun?{" "}
                        <Link as={RouterLink} to="/login" color="green.500" fontWeight="700">
                            Masuk
                        </Link>
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}
