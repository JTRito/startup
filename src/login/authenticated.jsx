import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button className = 'button' variant='primary' onClick={() => navigate('/join')}>
        Join a Game
      </Button>
      <Button className = 'button' variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
