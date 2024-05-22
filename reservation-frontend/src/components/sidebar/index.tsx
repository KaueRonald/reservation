import styles from "./index.module.scss"
import { Box, Button, Drawer, Link, ListItemButton, ListItemIcon, ListItemText, Modal } from "@mui/material"
import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { clearStorage, getStorage } from "@/utils/storage";
import { decodeToken } from "react-jwt";

export const Sidebar = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const OpenMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('PROVIDER');

    useEffect(() => {
        const token = getStorage('token');
        setIsLoggedIn(!!token);

        function tokenRole(token: string) {
            if (token) {
                const decoded = decodeToken(token);
                return decoded as { role: string };
            }
            return null;
        }

        const decodedToken = token ? tokenRole(token) : null;
        const userRole = decodedToken ? decodedToken.role : 'PROVIDER';

        setRole(userRole);
    }, []);

    return (
        <Box className={styles.container}>
            <MenuRoundedIcon className={styles.open} onClick={OpenMenu} fontSize="large" />
            <Drawer
                anchor="right"
                variant="temporary"
                open={menuAberto}
                onClose={OpenMenu}
                sx={{
                    "& .MuiPaper-root": {
                        width: 262,
                        backgroundColor: "white",
                    },
                }}
            >
                <Box>
                    <CloseIcon className={styles.close} onClick={OpenMenu} fontSize="large" />
                </Box>
                {isLoggedIn ? (
                    <Box>
                        <hr />
                        <Link href="/servicos" color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <WorkIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Serviços" />
                            </ListItemButton>
                        </Link>
                        <hr />
                        <Link href="/user/perfil" color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Perfil" />
                            </ListItemButton>
                        </Link>
                        <hr />
                        {role === 'PROVIDER' && (
                            <Box>
                                <Link href="/user/servicos" color="inherit" underline="none">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <BusinessCenterIcon sx={{ color: '#E44141' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Meus Serviços" />
                                    </ListItemButton>
                                </Link>
                                <hr />
                            </Box>
                        )}
                        <Link href="/user/agendamentos" color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <CalendarMonthIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Meus Agendamentos" />
                            </ListItemButton>
                        </Link>
                        <hr />
                        <Link onClick={handleOpenDelete} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </Link>
                    </Box>
                ) : (
                    <Box>
                        <hr />
                        <Link href="/" onClick={clearStorage} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Início" />
                            </ListItemButton>
                        </Link>
                        <hr />
                        <Link href="/login" onClick={clearStorage} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <LoginIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </Link>
                        <hr />
                        <Link href="/register" onClick={clearStorage} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonAddAltIcon sx={{ color: '#E44141' }} />
                                </ListItemIcon>
                                <ListItemText primary="Cadastrar" />
                            </ListItemButton>
                        </Link>
                    </Box>
                )}
                <hr />
                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box className={styles.confirmDelete} >
                        <Box className={styles.containerx}>
                            <CloseIcon className={styles.iconclose} onClick={handleCloseDelete} fontSize="large" />
                        </Box>
                        <h2>Tem certeza que quer sair?</h2>
                        <Box className={styles.btncontainer}>
                            <Button href="/" onClick={clearStorage} className={styles.btnDelete} variant="outlined">Sim</Button>
                            <Button onClick={handleCloseDelete} className={styles.btnDelete} variant="outlined">Não</Button>
                        </Box>
                    </Box>
                </Modal>
            </Drawer>
        </Box>
    )
}