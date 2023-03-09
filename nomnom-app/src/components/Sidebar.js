import './Sidebar.css'

import { Nav, Button } from 'react-bootstrap';

function Sidebar() {
  return (
    <Nav className="sidebar flex-column">
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/">My Reviews</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/">Recommendations</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/">Following</Nav.Link>
      </Nav.Item>
    </Nav> 
  );
}

export default Sidebar;