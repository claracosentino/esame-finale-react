import { useState } from "react";
import "./navbar.scss";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import IsAuthenticated from "../../hooks/isAuthenticated";

const Navbar = () => {
    const isAuthenticated = IsAuthenticated();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#1d1d1b" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FUSION
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem component={Link} to={"/"} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">HOME</Typography>
                            </MenuItem>

                            <MenuItem component={Link} to={"/events"} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">EVENTS</Typography>
                            </MenuItem>

                            {isAuthenticated ? (
                                <MenuItem
                                    component={Link}
                                    to={"/profile"}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">PROFILO</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    component={Link}
                                    to={"/auth"}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">LOGIN</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FUSION
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            component={Link}
                            to={"/"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            HOME
                        </Button>

                        <Button
                            component={Link}
                            to={"/events"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            EVENTS
                        </Button>

                        {isAuthenticated ? (
                            <Button
                                component={Link}
                                to={"/profile"}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                PROFILO
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to={"/auth"}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                LOGIN
                            </Button>
                        )}
                    </Box>
                    {/* <div className="block sm:hidden">XS</div>
                    <div className="hidden sm:block md:hidden">SM</div>
                    <div className="hidden md:block lg:hidden">MD</div>
                    <div className="hidden md:hidden lg:block xl:hidden">LG</div>
                    <div className="hidden lg:hidden xl:block">XL</div> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
