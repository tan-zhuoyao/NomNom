import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import './LandingView.css';

const LandingView = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  if (authStatus === 'authenticated') {
    return(<Navigate to="/home"></Navigate>)
  }

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div className='buttonContainer'>
              <a href='/home'>
                <Button size='lg' className='landingbutton'>
                  Login
                </Button>
              </a>
              <a href='/home'>
                <Button size='lg' className='landingbutton'>
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingView;