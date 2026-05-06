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
import { MdEmail, MdLockReset } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulasi API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1000);
    };

    if (submitted) {
        return (
            <Box w="100%" maxW="420px" mx="auto">
                <VStack spacing={6} align="center">
                    <Flex align="center" justify="center" w="64px" h="64px" rounded="2xl"
                        bg="blue.50" mb="2">
                        <Icon as={MdLockReset} w="32px" h="32px" color="blue.500" />
                    </Flex>
                    <Heading color="gray.900" fontSize="2xl" fontWeight="800" textAlign="center">
                        Cek Email Anda
                    </Heading>
                    <Text color="gray.500" fontSize="sm" textAlign="center" px="4">
                        Kami telah mengirimkan link reset password ke <b>{email}</b>. Silakan cek inbox Anda.
                    </Text>
                    <Link as={RouterLink} to="/login" color="blue.500" fontWeight="700" fontSize="sm">
                        Kembali ke Login
                    </Link>
                </VStack>
            </Box>
        );
    }

    return (
        <Box w="100%" maxW="420px" mx="auto">
            <VStack spacing={6} align="stretch">
                <Flex direction="column" align="center" mb="4">
                    <Flex align="center" justify="center" w="64px" h="64px" rounded="2xl"
                        bgGradient="linear(to-br, orange.400, orange.600)" mb="5"
                        boxShadow="0px 12px 24px rgba(237, 137, 54, 0.35)">
                        <Icon as={MdLockReset} w="28px" h="28px" color="white" />
                    </Flex>
                    <Heading color="gray.900" fontSize="2xl" fontWeight="800" letterSpacing="-0.02em" mb="2">
                        Lupa Password?
                    </Heading>
                    <Text color="gray.500" fontSize="sm" fontWeight="500" textAlign="center">
                        Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    bg="rgba(255,255,255,0.8)" border="1px solid"
                                    borderColor="gray.200" color="gray.900" fontWeight="500"
                                    _placeholder={{ color: "gray.400" }}
                                    _hover={{ borderColor: "orange.300", bg: "white" }}
                                    _focus={{ bg: "white", borderColor: "orange.500", boxShadow: "0 0 0 3px rgba(237, 137, 54, 0.15)" }}
                                    borderRadius="16px" h="52px" transition="all 0.2s"
                                />
                            </InputGroup>
                        </FormControl>

                        <Button type="submit" bg="orange.500" color="white" h="52px" borderRadius="16px"
                            fontWeight="700" fontSize="md" isLoading={loading} loadingText="Mengirim..."
                            _hover={{ bg: "orange.600", transform: "translateY(-2px)", boxShadow: "0px 10px 20px rgba(237, 137, 54, 0.3)" }}
                            _active={{ bg: "orange.700", transform: "translateY(0px)" }}
                            mt="4" transition="all 0.3s cubic-bezier(0.4,0,0.2,1)">
                            Kirim Link Reset
                        </Button>
                    </VStack>
                </form>

                <Box mt="6" pt="6" borderTop="1px solid" borderColor="rgba(0,0,0,0.05)" textAlign="center">
                    <Text fontSize="sm" color="gray.500" fontWeight="500">
                        Ingat password?{" "}
                        <Link as={RouterLink} to="/login" color="orange.500" fontWeight="700">
                            Masuk
                        </Link>
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}
