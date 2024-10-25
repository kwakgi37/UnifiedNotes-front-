import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* 메뉴 버튼 아이콘 */}
        <Link to="/">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Home"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
        </Link>

        {/* 페이지 제목 */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Unified Notes
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
