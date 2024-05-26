import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "../../../hooks/useAuth";
import Container from "@mui/material/Container"; // Corrected import from "@mui/system/Container"
import {
  APPBAR_DESKTOP,
  APPBAR_MOBILE,
  BRAND_NAME,
} from "components/data/constrain";

const AppbarStyle = styled(AppBar)({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  width: "100%",
  backgroundColor: "#F2F7FF",
  "@media print": {
    display: "none",
  },
});

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  color: "#fff",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: 0,
  },
}));

const LinkStyled = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const ButtonStyled = styled(Button)({
  fontSize: "1rem",
  fontWeight: "normal",
});

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppbarStyle>
      <Container>
        <ToolbarStyle>
          <Typography variant="h6" sx={{ fontSize: 19, flexGrow: 1 }}>
            {BRAND_NAME}
          </Typography>

          {isAuthenticated ? (
            <ButtonStyled
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 128, 0, 0.2)", // Green transparency
                },
              }}
              onClick={logout}
            >
              Logout
            </ButtonStyled>
          ) : (
            <>
              <ButtonStyled
                sx={{
                  p: 0,
                  "&:hover": {
                    backgroundColor: "rgba(0, 128, 0, 0.2)", // Green transparency
                  },
                }}
              >
                <LinkStyled to="/login">Login</LinkStyled>
              </ButtonStyled>

              <ButtonStyled
                sx={{
                  px: 2,
                  py: 0.5,
                  bgcolor: "#00A36C", // Green color
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 128, 0, 0.7)", // Darker green transparency
                  },
                }}
              >
                <LinkStyled to="/signup">Create an Account</LinkStyled>
              </ButtonStyled>
            </>
          )}
        </ToolbarStyle>
      </Container>
    </AppbarStyle>
  );
}
