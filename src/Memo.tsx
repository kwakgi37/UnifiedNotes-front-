import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  TextField,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DrawerComponent from './Components/DrawerComponent';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const drawerWidth = 240;

const Memo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [title, setTitle] = useState('새 페이지');
  const [content, setContent] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContentTitle, setIsEditingContentTitle] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleContentTitleClick = () => {
    setIsEditingContentTitle(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setIsEditingContentTitle(false);
  };

  const savePage = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/pages/${username}/${id}`,
        {
          username: username,
          title: title,
          content: content,
          video: videoUrl,
          audio: audioUrl,
        }
      );
      alert('저장되었습니다.');
      window.location.reload();
      console.log('변경되었습니다.', response.data);
    } catch (error) {
      console.log('변경에 실패하였습니다.', error);
    }
  };

  const deletePage = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/pages/${username}/${id}`
      );
      alert('페이지가 삭제되었습니다.');
      navigate(`/`);
      console.log('삭제하였습니다.', response.data);
    } catch (error) {
      console.log('삭제에 실패하였습니다.', error);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pages/${username}/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setVideoUrl(response.data.video);
        setAudioUrl(response.data.audio);
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };

    fetchPageData();
  }, [username, id]);

  const handleFileUpload = async (file: File, type: 'video' | 'audio') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/pages/${type}s/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.url) {
        console.log(`${type} uploaded:`, response.data.url);
        if (type === 'video') setVideoUrl(response.data.url);
        if (type === 'audio') setAudioUrl(response.data.url);
      } else {
        console.log('No url in response:', response.data);
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    }
  };

  // Dropzone 설정
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const fileType = file.type.startsWith('video') ? 'video' : 'audio';
      handleFileUpload(file, fileType as 'video' | 'audio');
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          transition: 'margin-left 0.3s ease',
          marginLeft: drawerOpen && !isMobile ? drawerWidth : 0,
          width: `calc(100% - ${drawerOpen && !isMobile ? drawerWidth : 0}px)`,
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
          {isEditingTitle ? (
            <TextField
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
              inputProps={{
                style: { fontSize: '1.25rem', color: '#000' },
              }}
              variant="standard"
            />
          ) : (
            <Typography
              variant="h6"
              style={{ flexGrow: 1, color: '#000', cursor: 'pointer' }}
              onClick={handleTitleClick}
            >
              {title}
            </Typography>
          )}
          <IconButton style={{ color: '#000' }} aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton style={{ color: '#000' }} aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <DrawerComponent drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* 메인 콘텐츠 */}
      <main
        style={{
          flexGrow: 1,
          padding: '1rem',
          marginLeft: drawerOpen ? drawerWidth : 0,
          transition: 'margin-left 0.3s ease',
          marginTop: '64px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundImage:
              'url(https://png.pngtree.com/thumb_back/fw800/background/20231008/pngtree-soft-focus-blurred-pink-flowers-on-a-spring-tree-horizontal-background-image_13622598.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            height: '90vh',
            margin: '5px',
          }}
        >
          <div
            style={{
              justifyContent: 'left',
              margin: '5px',
              width: 'auto',
            }}
          >
            {isEditingContentTitle ? (
              <TextField
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                autoFocus
                inputProps={{
                  style: { fontSize: '3rem' },
                }}
                variant="standard"
              />
            ) : (
              <Typography
                variant="h1"
                component="h1"
                style={{ fontSize: '3rem', cursor: 'pointer' }}
                onClick={handleContentTitleClick}
              >
                {title}
              </Typography>
            )}
          </div>
          <div
            style={{
              textAlign: 'right',
              margin: '5px',
              width: 'auto',
            }}
          >
            <Button
              variant="contained"
              onClick={savePage}
              style={{ margin: '10px' }}
              startIcon={<SaveIcon />}
            >
              저장
            </Button>
            <Button
              variant="contained"
              onClick={deletePage}
              color="error"
              startIcon={<DeleteIcon />}
            >
              삭제
            </Button>
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(_event: any, editor: any) => {
              const data = editor.getData();
              console.log({ data });
              setContent(data);
            }}
            config={{
              ckfinder: {
                uploadUrl: 'http://localhost:8080/api/pages/upload',
                options: {
                  resourceType: 'Images',
                },
              },
            }}
          />
          {/* 드래그 앤 드롭 파일 업로드 */}
          <div
            {...getRootProps()}
            style={{
              border: '2px dashed gray',
              borderRadius: '4px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>파일을 놓으세요...</p>
            ) : (
              <p>파일을 드래그하거나 여기를 클릭하여 업로드하세요.</p>
            )}
          </div>

          {/* 비디오 */}
          {videoUrl && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h3>업로드된 비디오:</h3>
              <video
                src={videoUrl}
                controls
                style={{ width: '30%', height: '25%' }}
              />
            </div>
          )}

          {/* 오디오 */}
          {audioUrl && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h3>업로드된 오디오:</h3>
              <audio src={audioUrl} controls style={{ width: '20%' }} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Memo;
