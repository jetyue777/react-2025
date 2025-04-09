// src/components/Header.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Home } from '@mui/icons-material';
import { RootState } from '../store/rootReducer';
import styles from './Header.module.scss';

// Navigation and settings options
const pages: string[] = ['Todo', 'New', 'Comment'];
const settings: string[] = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Menu anchor state
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Menu handlers
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Helper function to check if link is active
  const isLinkActive = (isActive: boolean) => {
    return isActive ? { backgroundColor: '#4f99d9' } : {};
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Home button */}
          <Box>
            <Link to={'/'} className={styles.headerLink}>
              <Button
                className={styles.headerLogoButton}
                size="large"
                startIcon={<Home />}
                fullWidth
              >
                HOME
              </Button>
            </Link>
          </Box>

          {/* Navigation Links Box */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink
                key={page}
                to={`/${page.toLowerCase()}`}
                className={styles.headerLink}
                style={({ isActive }) => isLinkActive(isActive)}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  size="large"
                  className={styles.headerActionButton}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
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
  );
};

export default Header;