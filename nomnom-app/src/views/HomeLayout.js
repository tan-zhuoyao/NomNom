import './HomeLayout.css';
import Home from './Home';
import Reviews from './Reviews';
import Recommendations from './Recommendations';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import { Button } from 'react-bootstrap';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';


function HomeLayout({ signOut, user }) {
  const [mode, setMode] = useState("Upload Review");
  
  return (   
    <div className='HomeLayout'>
    <div className='HomeLayout-header'>Nomnom</div>
      <Sidebar setMode={setMode}/>
      <div className='HomeLayout-main'>
        {(mode === "Upload Review") && <Home />}
        {(mode === "My Reviews") && <Reviews />}
        {(mode === "Recommendations") && <Recommendations />}
        {(mode === "Search") && <Search />}
      </div>
      <Button onClick={signOut} variant='light'>
        Sign Out
      </Button>
      {/* <div className='App-footer'>Footer</div> */}
    </div>   
  );
}

export default withAuthenticator(HomeLayout);