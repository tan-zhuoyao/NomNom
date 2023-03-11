import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingView.css';

const LandingView = () => {

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            {/* <div>
              <h1 className='title'>PeerPrep</h1>
              <p className='subtitle'>The answer to your interview woes.</p>
            </div> */}
            <div className='buttonContainer'>
              <a href='/'>
                <Button size='lg' className='landingbutton' variant='light'>
                  Login
                </Button>
              </a>
              <a href='/'>
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