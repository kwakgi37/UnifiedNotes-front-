import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Alert,
} from '@mui/material';
import AppHeader from './Components/LoginHeader';

function Signup() {
  const [username, setUsername] = useState(''); // 입력된 아이디
  const [password, setPassword] = useState(''); // 입력된 패스워드
  const [email, setEmail] = useState(''); // 입력된 이메일
  const [authCode, setAuthCode] = useState(''); // 입력된 인증번호
  const [sentAuthCode, setSentAuthCode] = useState(''); // 서버에서 받은 인증번호
  const [authStatus, setAuthStatus] = useState(false); // 인증 완료 상태
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | undefined
  >(undefined);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        password,
        email,
      });
      alert('가입이 완료되었습니다.');
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleMailSend = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/mailSend', {
        mail: email, // 'mail'이라는 필드로 이메일 전달
      });
      setAlertSeverity('success');
      setAlertMessage('인증번호를 발송하였습니다!');
      console.log('email Send Success: ', response.data);
      setSentAuthCode(response.data.number); // 서버에서 받은 인증번호를 상태로 저장
    } catch (error) {
      console.error('Error email Send Failed: ', error);
    }
  };

  const handleAuthCodeCheck = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mailCheck', {
        params: { userNumber: authCode }, // userNumber 파라미터로 authCode 전달
      });

      if (response.data) {
        setAuthStatus(true);
        setAlertSeverity('success');
        setAlertMessage('인증에 성공하였습니다.');
      } else {
        setAuthStatus(false);
        console.log(authCode);
        setAlertSeverity('error');
        setAlertMessage('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error checking auth code:', error);
      alert('인증번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <AppHeader /> {/* AppHeader 추가*/}
      <Container maxWidth="xs">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            회원가입
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
              <TextField
                fullWidth
                type="email"
                label="ex) example@google.com"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleMailSend}>
                인증번호 발송
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="인증번호를 입력해주세요."
                variant="outlined"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color={authStatus ? 'success' : 'primary'}
                onClick={handleAuthCodeCheck}
              >
                인증번호 확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignup}
                  disabled={!authStatus}
                >
                  가입하기
                </Button>
              </Link>
            </Grid>

            {/* 로그인 페이지로 돌아가는 버튼 추가 */}
            <Grid item xs={12}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary" fullWidth>
                  로그인 페이지로 돌아가기
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
