import React from "react";
import { Button } from "@chakra-ui/react";

export default function PrimaryButton({ children, leftIcon, rightIcon, variant = "solid", _hover, ...rest }) {
  return (
    <Button
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      variant={variant}
      borderRadius="18px"
      fontWeight="800"
      transition="all 0.25s ease"
      boxShadow={variant === "ghost" ? "none" : "0 12px 24px rgba(251,146,60,0.28)"}
      _hover={{
        transform: variant === "ghost" ? undefined : "translateY(-2px)",
        ..._hover,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
