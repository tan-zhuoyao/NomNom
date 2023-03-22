import './HomeLayout.css';
import Home from './Home';
import Recommendations from './Recommendations';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import { Button } from 'react-bootstrap';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';


function HomeLayout({ user }) {
  const [mode, setMode] = useState("My Reviews");
  const navigate = useNavigate();
  const signOut = () => {
    Auth.signOut().then(res => {
      navigate('/');
    })
  }

  return (   
    <div className='HomeLayout'>
    <div className='HomeLayout-header'>Nomnom</div>
      <Sidebar setMode={setMode}/>
      <div className='HomeLayout-main'>
        {(mode === "My Reviews") && <Home />}
        {(mode === "Recommendations") && <Recommendations />}
        {(mode === "Search") && <Search />}
      </div>
      <Button onClick={signOut} variant='light'>
        Sign Out
      </Button>
    </div>   
  );
}

export default withAuthenticator(HomeLayout);