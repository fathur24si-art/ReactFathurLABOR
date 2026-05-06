import React, { Suspense, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Antigravity from "../exercises/pertemuan5/Antigravity.jsx";
import CountUp from "../exercises/pertemuan7/CountUp.jsx";

const MotionFlex = motion(Flex);

export default function AuthLayout() {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg="#f8fafc"
            position="relative"
            p={{ base: "4", md: "8" }}
            overflow="hidden"
        >
            {/* Antigravity Background */}
            <Box position="absolute" inset="0" opacity={0.6}>
                <Suspense fallback={null}>
                    <Antigravity />
                </Suspense>
            </Box>

            <AnimatePresence mode="wait">
                {showSplash ? (
                    <MotionFlex
                        key="splash"
                        direction="column"
                        align="center"
                        justify="center"
                        position="relative"
                        zIndex="10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <Heading
                            fontSize={{ base: "5xl", md: "7xl" }}
                            fontWeight="900"
                            color="gray.900"
                            letterSpacing="tighter"
                            mb="2"
                            textAlign="center"
                        >
                            Selamat Datang
                        </Heading>
                        <Flex align="center" fontSize="3xl" color="blue.600" fontWeight="800">
                            <CountUp
                                from={0}
                                to={100}
                                separator=","
                                direction="up"
                                duration={2}
                                delay={0.2}
                                onEnd={() => setTimeout(() => setShowSplash(false), 600)}
                            />
                            <Text ml="1">%</Text>
                        </Flex>
                    </MotionFlex>
                ) : (
                    <MotionFlex
                        key="content"
                        direction="column"
                        align="center"
                        justify="center"
                        position="relative"
                        zIndex="1"
                        w="100%"
                        h="100%"
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Outlet merender child route: Login / Register / Forgot */}
                        <Outlet />
                    </MotionFlex>
                )}
            </AnimatePresence>
        </Flex>
    );
}
