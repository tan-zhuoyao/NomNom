import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Sidebar from './components/Sidebar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className='App'>
      <div className='App-header'>Nomnom</div>
      <Sidebar/>
      <div className='App-main'>
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </Router>
        </Container>
      </div>
      <div className='App-footer'>Footer</div>
    </div>

  );
}

export default App;
