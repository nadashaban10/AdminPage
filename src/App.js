import Login from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './DashBoard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;