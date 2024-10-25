import React, { useState, useEffect } from 'react';
import DrawerComponent from './Components/DrawerComponent';
import AppBarComponent from './Components/AppBarComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Icon, Box } from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material'; // 아이콘 추가
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const Home: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const [pages, setPages] = useState<{ id: number; title: string }[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsernameAndPages = async () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);

        try {
          const response = await axios.get(
            `http://localhost:8080/api/pages/${storedUsername}`
          );
          setPages(response.data);
        } catch (error) {
          console.error('Error fetching pages:', error);
        }
      }
    };

    fetchUsernameAndPages();
  }, []);

  // 페이지 추가 함수
  const addPage = async () => {
    const username = localStorage.getItem('username');
    try {
      if (!username) {
        alert('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/pages/add', {
        username,
        title: '새 페이지',
        content: '',
      });

      const newPage = response.data; // 서버에서 반환된 새로운 페이지를 직접 사용
      setPages([...pages, newPage]); // 페이지 배열 업데이트
      window.location.reload();
    } catch (error) {
      console.error('Error adding page:', error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawerList = () => (
    <Grid container spacing={2}>
      {pages.map((page) => (
        <Grid item xs={12} sm={6} md={4} key={page.id}>
          <Card
            onClick={() => navigate(`/Memo/${username}/${page.id}`)}
            style={{
              cursor: 'pointer',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 카드 그림자 추가
              transition: 'transform 0.2s',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center">
                <Icon
                  component={InsertDriveFile}
                  style={{ marginRight: '8px' }}
                />
                <Typography variant="h6">{page.title}</Typography>
              </Box>
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                color="text.secondary"
              ></Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          onClick={addPage}
          style={{
            cursor: 'pointer',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 카드 그림자 추가
            transition: 'transform 0.2s',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <Icon component={AddIcon} style={{ marginRight: '8px' }} />
              <Typography variant="h6">새 페이지 추가</Typography>
            </Box>
            <Box
              mt={2}
              display="flex"
              alignItems="center"
              color="text.secondary"
            ></Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#f4f5f7',
        minHeight: '100vh',
      }}
    >
      <AppBarComponent drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <DrawerComponent drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <main
        style={{
          flexGrow: 1,
          padding: '2rem',
          marginLeft: drawerOpen ? drawerWidth : 0,
          transition: 'margin-left 0.3s ease',
          marginTop: '64px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {drawerList()}
      </main>
    </div>
  );
};

export default Home;
