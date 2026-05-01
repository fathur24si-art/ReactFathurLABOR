import React from "react";
import { Box, Flex, Text, Button, useColorModeValue, keyframes } from "@chakra-ui/react";
import { MdRefresh, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

// Premium Floating Animation
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const ErrorPage = ({ errorCode, description, image }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const brandColor = "brand.500";
  const bgCard = useColorModeValue("white", "navy.800");

  const floatAnimation = `${float} 3s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 4s ease-in-out infinite`;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="80vh"
      pt={{ base: "130px", md: "80px" }}
      textAlign="center"
      px="20px"
    >
      <Box position="relative" mb="60px">
        {/* Animated Background Glow */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="300px"
          h="300px"
          bg={brandColor}
          filter="blur(100px)"
          opacity="0.2"
          borderRadius="full"
          animation={pulseAnimation}
        />

        <Flex align="center" justify="center" zIndex="1" position="relative">
          <Text
            fontSize={{ base: "140px", md: "200px" }}
            fontWeight="900"
            lineHeight="1"
            color={textColor}
            opacity="0.05"
            letterSpacing="-15px"
            userSelect="none"
          >
            {errorCode}
          </Text>
          
          <Box 
            position="absolute"
            animation={floatAnimation}
            w={{ base: "180px", md: "260px" }}
          >
            {image ? (
               <img src={image} alt="Error Illustration" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }} />
            ) : (
                <Box 
                    w="150px" h="150px" bg={brandColor} borderRadius="30px" 
                    transform="rotate(15deg)" boxShadow="2xl"
                    display="flex" alignItems="center" justifyContent="center"
                >
                    <Text color="white" fontSize="5xl" fontWeight="800">!</Text>
                </Box>
            )}
          </Box>
        </Flex>
      </Box>

      <Box maxW="600px" zIndex="2">
        <Text color={textColor} fontSize={{ base: "2xl", md: "4xl" }} fontWeight="800" mb="15px" letterSpacing="-1px">
            Oops! Terjadi Gangguan Sistem
        </Text>
        <Text color={subTextColor} fontSize="lg" mb="40px" lineHeight="1.6">
          {description} <br />
          Jangan khawatir, tim <b>Resto Rustaf</b> sedang menanganinya.
        </Text>
        
        <Flex gap="15px" justify="center" wrap="wrap">
            <Button
                as={Link}
                to="/admin/beranda"
                leftIcon={<MdHome />}
                bg={bgCard}
                color={textColor}
                _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.100") }}
                boxShadow="lg"
                borderRadius="16px"
                h="56px"
                px="32px"
            >
                Kembali ke Beranda
            </Button>
            <Button
                leftIcon={<MdRefresh />}
                colorScheme="brand"
                boxShadow="0px 10px 20px rgba(67, 24, 255, 0.2)"
                borderRadius="16px"
                h="56px"
                px="32px"
                onClick={() => window.location.reload()}
            >
                Segarkan Halaman
            </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ErrorPage;
