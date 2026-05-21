import React from "react";
import { Box } from "@chakra-ui/react";

export default function PanelCard({ children, bg = "white", borderColor = "transparent", boxShadow = "0 18px 40px rgba(15,23,42,0.08)", p = "22px", ...rest }) {
  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="28px"
      p={p}
      boxShadow={boxShadow}
      transition="all 0.25s ease"
      {...rest}
    >
      {children}
    </Box>
  );
}
