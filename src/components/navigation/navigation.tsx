import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import { navigations } from "./navigation.data";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

type NavigationData = {
  path: string;
  label: string;
};

const Navigation: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [account, setAccount] = useState<string | null>(null);


  const connectMetaMask = async () => {
    try {
      if (typeof (window as any).ethereum !== "undefined") {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
      } else {
        alert("MetaMask is not installed!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "end",
        flexDirection: { xs: "column", lg: "row" }
      }}
    >
      {navigations.map(({ path: destination, label }: NavigationData) => (
        <Box
          key={label}
          component={Link}
          href={destination}
          sx={{
            display: "inline-flex",
            position: "relative",
            color: currentPath === destination ? "" : "white",
            lineHeight: "30px",
            letterSpacing: "3px",
            cursor: "pointer",
            textDecoration: "none",
            textTransform: "uppercase",
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 0, lg: 3 },
            mb: { xs: 3, lg: 0 },
            fontSize: "20px",
            ...destination === "/" && { color: "primary.main" },
            "& > div": { display: "none" },
            "&.current>div": { display: "block" },
            "&:hover": {
              color: "text.disabled"
            }
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 12,
              transform: "rotate(3deg)",
              "& img": { width: 44, height: "auto" }
            }}
          >
            {/* eslint-disable-next-line */}
            <img src="/images/headline-curve.svg" alt="Headline curve" />
          </Box>
          {label}
        </Box>
      ))}
      <Box
  onClick={connectMetaMask} 
  sx={{
    position: "relative",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
    textTransform: "uppercase",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", 
    px: { xs: 2, lg: 3 }, 
    mb: { xs: 3, lg: 0 },
    fontSize: "16px", 
    lineHeight: "1.5", 
    width: "324px", 
    height: "45px",
    borderRadius: "6px",
    backgroundColor: "#00dbe3",
    overflow: "hidden", 
    whiteSpace: "nowrap", 
    textAlign: "center", 
  }}
>
  {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
</Box>

    </Box>
  );
};

export default Navigation;
