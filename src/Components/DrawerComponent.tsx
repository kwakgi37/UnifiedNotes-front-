import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

interface DrawerComponentProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<{ id: number; title: string }[]>([]); // id로 수정
  const [openPersonalPage, setOpenPersonalPage] = useState(true);
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
    } catch (error) {
      console.error('Error adding page:', error);
    }
  };

  const LogoutHandler = async () => {
    localStorage.removeItem('username'); // localStorage에서 username 삭제
    setUsername(null); // 상태에서 username을 null로 설정
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handlePersonalPageToggle = () => {
    setOpenPersonalPage(!openPersonalPage);
  };

  const drawerList = () => (
    <div role="presentation" onKeyDown={toggleDrawer}>
      <List>
        {username ? (
          <ListItemText primary={username} style={{ textAlign: 'center' }} />
        ) : (
          <ListItemButton
            onClick={() => {
              navigate('/login');
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="로그인을 해 주세요." />
          </ListItemButton>
        )}
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home Page"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItemButton>

        <ListItemButton onClick={addPage}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Page Add" />
        </ListItemButton>

        <ListItemButton onClick={handlePersonalPageToggle}>
          <ListItemText
            primary="Page List"
            primaryTypographyProps={{ variant: 'body2' }}
            style={{ textAlign: 'center' }}
          />
          {openPersonalPage ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={openPersonalPage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {pages.map((page) => (
              <ListItemButton
                key={page.id} // id로 수정
                onClick={() => navigate(`/Memo/${username}/${page.id}`)} // id로 이동
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={() => navigate('/information')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Information" />
        </ListItemButton>
        {username ? (
          <ListItemButton onClick={LogoutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <></>
        )}
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      variant="persistent"
      PaperProps={{
        style: {
          width: 240,
          backgroundColor: '#F4F5F2',
        },
      }}
    >
      {drawerList()}
    </Drawer>
  );
};

export default DrawerComponent;
