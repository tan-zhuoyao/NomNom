import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './views/HomeLayout';
import LandingView from './views/LandingView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingView />}></Route>
        <Route path="/home" element={<HomeLayout/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
