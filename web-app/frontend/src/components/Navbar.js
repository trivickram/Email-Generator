import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            Cold Email Generator
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="primary"
            variant={location.pathname === '/' ? 'contained' : 'text'}
          >
            Generate
          </Button>
          <Button
            component={Link}
            to="/about"
            color="primary"
            variant={location.pathname === '/about' ? 'contained' : 'text'}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/docs"
            color="primary"
            variant={location.pathname === '/docs' ? 'contained' : 'text'}
          >
            Docs
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
