import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GitHub, LinkedIn, Menu, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const scrollToPortfolio = () => {
    navigate("/portfolio/");
    setTimeout(() => {
      const portfolioElement = document.getElementById("portfolio");

      if (portfolioElement) {
        portfolioElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100);
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/portfolio/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Quinn Peterson
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={scrollToPortfolio}>Portfolio</IconButton>

          {/* https://drive.google.com/file/d/1aPniDaSxSjFelF-Xsw2TLSmfLGtD6CuN/view */}
          <IconButton onClick={() => {
              window.open("https://docs.google.com/document/d/1_Q9wbUfKEOUtKrsrXLKS3OPrGnDHHKxDm1rOKfmKx1o/edit?usp=sharing", "_blank");
            }}>Resume</IconButton>

          <IconButton
            onClick={() => {
              window.open("https://github.com/quinnpeterson", "_blank");
            }}
          >
            <GitHub></GitHub>
          </IconButton>
          <IconButton
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/quinn-peterson-software-engineer/",
                "_blank"
              );
            }}
          >
            <LinkedIn></LinkedIn>
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={scrollToPortfolio}>Portfolio</IconButton>
            <IconButton onClick={() => {
              window.open("https://docs.google.com/document/d/1_Q9wbUfKEOUtKrsrXLKS3OPrGnDHHKxDm1rOKfmKx1o/edit?usp=sharing", "_blank");
            }}>Resume</IconButton>

            <IconButton
              onClick={() => {
                window.open("https://github.com/quinnpeterson", "_blank");
              }}
            >
              <GitHub></GitHub>
            </IconButton>
            <IconButton
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/quinn-peterson-software-engineer/",
                  "_blank"
                );
              }}
            >
              <LinkedIn></LinkedIn>
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
