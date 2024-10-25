import DrawerComponent from './Components/DrawerComponent';
import AppBarComponent from './Components/AppBarComponent';
import React, { useState } from 'react';

const drawerWidth = 240;

const Information: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

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
        <h1>사이트 소개 (About the Site)</h1>
        <p>
          우리 사이트는 사용자들이 개인 노트와 페이지를 쉽게 관리하고 저장할 수
          있도록 설계되었습니다. 직관적인 인터페이스로 페이지를 추가, 삭제 및
          수정할 수 있으며, 모든 노트는 안전하게 데이터베이스에 저장됩니다. 이를
          통해 사용자는 개인 메모를 효과적으로 관리할 수 있으며, 언제 어디서나
          쉽게 접근할 수 있습니다.
        </p>

        <h1>기능 안내 (Features)</h1>
        <h3>주요 기능:</h3>
        <ul>
          <li>개인 페이지 관리: 여러 페이지를 추가하고 관리할 수 있습니다.</li>
          <li>
            파일 및 이미지 업로드: 페이지에 파일이나 이미지를 추가할 수
            있습니다.
          </li>
          <li>
            페이지별 내용 편집: 각 페이지의 제목과 내용을 자유롭게 편집할 수
            있습니다.
          </li>
        </ul>

        <h1>사용 가이드 (User Guide)</h1>
        <h3>사이트 사용 방법:</h3>
        <ul>
          <li>
            <b>페이지 추가:</b> '새 페이지' 버튼을 클릭하면 새로운 페이지가
            추가됩니다.
          </li>
          <li>
            <b>내용 편집:</b> 추가된 페이지 제목을 클릭하면, 페이지로 이동하여
            내용을 수정할 수 있습니다. (주의사항: 저장 버튼을 누르지 않을 시
            내용이 저장이 되지 않습니다.)
          </li>
          <li>
            <b>로그아웃:</b> 메뉴에서 로그아웃 버튼을 클릭하여 현재 세션을
            종료하고 로그인 페이지로 이동합니다.
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Information;
