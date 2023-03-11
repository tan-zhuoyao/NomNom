import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingView.css';

const LandingView = () => {

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div className='buttonContainer'>
              <a href='/home'>
                <Button size='lg' className='landingbutton' variant='light'>
                  Login
                </Button>
              </a>
              <a href='/home'>
                <Button size='lg' className='landingbutton' variant='light'>
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