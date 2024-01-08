import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Nav.css';

function Nav() {

const [show, handleShow] = useState(false);
const navigate = useNavigate();

const transitionNavBar = () =>{
    if (window.scrollY > 100){
        handleShow(true)
    } else {
        handleShow(false)
    }
}

useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
}, []);

  return (
    <div className= {`nav ${show && 'nav_black'}`}>
        <div className='nav_content'>
            <img className='nav_logo'
                 onClick={() => navigate('/')}
                 src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' 
                 alt='Netflix logo'/>

            <img className='nav_avatar'
                 onClick={() => navigate('/profile')}
                 src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                 alt='Netflix avatar'/>
        </div>
       
    </div>
  )
}

export default Nav