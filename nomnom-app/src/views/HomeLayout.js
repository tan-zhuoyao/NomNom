import './HomeLayout.css';
import Home from './Home';
import Sidebar from '../components/Sidebar';
import { Button } from 'react-bootstrap';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function HomeLayout({ signOut, user }) {
  return (   
    <div className='HomeLayout'>
    <div className='HomeLayout-header'>Nomnom</div>
      <Sidebar/>
      <div className='HomeLayout-main'>
        <Home />
      </div>
      <Button onClick={signOut} variant='light'>
        Sign Out
      </Button>
      {/* <div className='App-footer'>Footer</div> */}
    </div>   
  );
}

export default withAuthenticator(HomeLayout);