import './Sidebar.css'

import { Nav } from 'react-bootstrap';

function Sidebar(props) {
  const {setMode} = props;
  return (
    <Nav className="sidebar flex-column">
      <Nav.Item className="sidebar-item">
        <Nav.Link onClick={() => setMode("Upload Review")}>Upload Review</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link onClick={()=>setMode("My Reviews")}>My Reviews</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link onClick={()=>setMode("Recommendations")}>Recommendations</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link onClick={() => setMode("Search")}>Search</Nav.Link>
      </Nav.Item>
    </Nav> 
  );
}

export default Sidebar;