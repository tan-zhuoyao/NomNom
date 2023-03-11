import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './views/HomeLayout';
import Sidebar from './components/Sidebar';
import { Container } from 'react-bootstrap';
import Header from "./components/Header";
import LandingView from './views/LandingView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homelayout" element={<HomeLayout/>}/>
        <Route path="/" element={<LandingView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
