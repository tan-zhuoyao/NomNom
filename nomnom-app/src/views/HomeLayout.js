import './HomeLayout.css';
import Home from './Home';
import Recommendations from './Recommendations';
import Search from './Search';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


function HomeLayout({ user }) {
  const [mode, setMode] = useState("My Reviews");
  const navigate = useNavigate();
  const signOut = () => {
    Auth.signOut().then(res => {
      navigate('/');
    })
  }

  return (
    <div className="home-main">
      <Navbar className="navbar-colour" expand="lg">
      <Container>
        <Navbar.Brand style={{color:"white"}} href="#home">
          NomNom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color:"white"}} onClick={() => setMode("My Reviews")}>
              Reviews
            </Nav.Link>
            <Nav.Link style={{color:"white"}} onClick={() => setMode("Recommendations")}>
              Recommendations
            </Nav.Link>
            <Nav.Link style={{color:"white"}} onClick={() => setMode("Search")}>
              Search
            </Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              <Nav.Link style={{color:"white"}} onClick={signOut}>
                Sign out
              </Nav.Link>
            </Nav>   
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {(mode === "My Reviews") && <Home />}
    {(mode === "Recommendations") && <Recommendations />}
    {(mode === "Search") && <Search />}
    </div>
    
  );
}

export default withAuthenticator(HomeLayout);