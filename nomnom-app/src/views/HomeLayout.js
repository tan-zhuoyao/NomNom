import './HomeLayout.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from '../components/Sidebar';
import { Container } from 'react-bootstrap';

function HomeLayout() {
  return (
    <div className='HomeLayout'>
      <div className='HomeLayout-header'>Nomnom</div>
      <Sidebar/>
      <div className='HomeLayout-main'>
        <Container>
            <Route path="/" element={<Home/>}/>
        </Container>
      </div>
      {/* <div className='App-footer'>Footer</div> */}
    </div>
  );
}

export default HomeLayout;