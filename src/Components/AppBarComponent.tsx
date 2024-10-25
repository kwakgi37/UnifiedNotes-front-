import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

interface AppBarProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const AppBarComponent: React.FC<AppBarProps> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: 'margin-left 0.3s ease',
        marginLeft: drawerOpen ? 240 : 0, // drawerWidth로 맞춤
        width: `calc(100% - ${drawerOpen ? 240 : 0}px)`,
        zIndex: 1301,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          style={{ color: '#000' }}
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, color: '#000', cursor: 'pointer' }}
        ></Typography>
        <IconButton style={{ color: '#000' }} aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton style={{ color: '#000' }} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
