import React from 'react'
import Lock from '../icons/Lock';
import User from '../icons/User';
import Help from '../icons/Help';
import Logout from '../icons/Logout';

const Profileview = () => {
  return (
    <div className='profile_container'>
      <div className="profile_header">
                <img src="images/Photo.png" alt="profile" />
                <div className="profile_details">
                  <h4>Melanie Chairman</h4>
                  <p>VP of Operations</p>
                </div>
              </div>
              <ul>
                <li>
                  <span className="icon">
                    <Lock />
                  </span>
                  <span className="txt">Access admin area</span>
                </li>
                <li>
                  <span className="icon">
                    <User />
                  </span>
                  <span className="txt">Account</span>
                </li>
                <li>
                  <span className="icon">
                    <Help />
                  </span>
                  <span className="txt">Help</span>
                </li>
                <li>
                  <span className="icon">
                    <Logout />
                  </span>
                  <span className="txt">Logout</span>
                </li>
              </ul>
    </div>
  )
}

export default Profileview