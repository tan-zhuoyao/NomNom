import './Sidebar.css'

import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <Nav className="sidebar flex-column">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Contact</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;