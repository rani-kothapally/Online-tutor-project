import React from 'react';
import favIcon from './assets/favicon.png';
import profilePicture from './assets/profile-pic.png';

const Header = () => {
    return (
        <div className='header'>
        <div className='pageLogo'><img src={favIcon} width={40} />Online Tutor</div>
        <div className='profilePic'>
          <img src={profilePicture} width={50} style={{borderRadius: '50%'}}/>
        </div>
      </div>
    )
}
export default Header;