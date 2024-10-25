import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Grid,
} from '@mui/material';
import AppHeader from './Components/LoginHeader'; // AppHeader 컴포넌트 임포트

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | undefined
  >(undefined);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });
      setAlertSeverity('success');
      setAlertMessage('로그인에 성공했습니다!');
      console.log('Logged in:', response.data);
      localStorage.setItem('username', username);
      // 로그인 성공 시 홈 페이지로 이동
      navigate('/');
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <AppHeader /> {/* AppHeader 추가 */}
      <Container maxWidth="xs">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            로그인
          </Typography>

          {alertMessage && (
            <Alert severity={alertSeverity} variant="filled" sx={{ mb: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="아이디를 입력해주세요."
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="비밀번호를 입력해주세요."
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleLogin}>
                로그인
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                to="/signup"
                style={{ textDecoration: 'none', color: '#1976d2' }}
              >
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
