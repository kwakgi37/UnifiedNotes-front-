import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Memo from './Memo';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Information from './Information';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Memo/:username/:id" element={<Memo />} />
          {/* URL 패턴을 id로 수정 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
