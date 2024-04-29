import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RennuevaLogo from '../assets/Rennueva.jpg';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DocIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const user = {
    name: "Usuario Ejemplo",
    email: "usuario@example.com",
    avatar: "/avatar.jpg",
};



const MobileMenu = ({ open, setOpen }) => {
    

    const DrawerList = (
        <Box sx={{ width: 250, paddingTop: '80px' }} role="presentation" onClick={() => setOpen(false)} >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 150,
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{ width: 64, height: 64, mb: 1 }}
                />
                <Typography variant="h6" >
                    {user.name}
                </Typography>
                <Typography variant="body2">
                    {user.email}
                </Typography>
            </Box>
            <Divider />
            <List>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                           <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Responsivas" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );
    return (
        <Drawer open={open} onClose={() => setOpen(false)} sx={{'& .MuiPaper-root': {top: '85px', borderRadius: '30px'}}}>
            {DrawerList}
        </Drawer>
    )

}


export default function CentroLayout({ children }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [desktop, setDesktop] = useState(window.innerWidth > 899);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };





    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 899) {
                setDesktop(true);
            } else {
                setDesktop(false);
            }
        });

        return () => {
            window.removeEventListener('resize', () => {
                if (window.innerWidth > 899) {
                    setDesktop(true);
                } else {
                    setDesktop(false);
                }
            });
        }

    }, []);




    return (
        <>
           <AppBar position="fixed" sx={{ display: 'flex', flexDirection: 'row', padding: 0, backgroundColor: 'white', borderRadius: '0 0 30px 30px', zIndex: (theme) => theme.zIndex.drawer + 1} }>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    open? setOpen(false) : setOpen(true);
                                }}
                                color="primary"
                            >
                                {open? <ArrowBackIcon/> : <MenuIcon />}
                            </IconButton>
                        </Box>
                        <Box sx={{ height: '50px', marginX: { xs: 'auto', md: '0' } }}>
                            <img src={RennuevaLogo} alt="Rennueva" style={{ height: '100%' }} />
                        </Box>
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {desktop ? null : <MobileMenu open={open} setOpen={setOpen} />}
            <Box component="main" sx={{marginTop: '55px', overflowY: 'visible', height: 'fit-content'}}>
                {children}
            </Box>
        </>
    );

}