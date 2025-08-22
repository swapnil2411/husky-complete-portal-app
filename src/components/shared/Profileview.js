import React from 'react'
import Lock from '../icons/Lock';
import User from '../icons/User';
import Help from '../icons/Help';
import Logout from '../icons/Logout';
import { Link } from 'react-router-dom';

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
                 <Link>
                   <span className="icon">
                    <Lock />
                  </span>
                  <span className="txt">Access admin area</span>
                 </Link>
                </li>
                <li>
                  <Link>
                  <span className="icon">
                    <User />
                  </span>
                  <span className="txt">Account</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span className="icon">
                    <Help />
                  </span>
                  <span className="txt">Help</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span className="icon">
                    <Logout />
                  </span>
                  <span className="txt">Logout</span>
                  </Link>
                </li>
              </ul>
    </div>
  )
}

export default Profileview