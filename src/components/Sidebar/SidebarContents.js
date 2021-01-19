import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaGamepad,
  FaSignOutAlt,
  FaIdBadge,
  FaCog
} from 'react-icons/fa';
import { logout } from '../../store/actions/authActions';

const SidebarContents = () => {
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);
  let history = useHistory();

  const onLogoutClick = () => {
    logoutUser();
    return history.push('/');
  };

  return (
    <div>
      <div>
        <div className='side-bar'>
          <div className='logo'>
            <span>Icon</span>
            <span className='nav-title'>GSN</span>
          </div>
          <section className='search-field'>
            <input type='text' placeholder='Search...'></input>
          </section>
          <div className='home-btn'>
            <Link to='/dashboard'>
              <button>
                <span>
                  <FaHome />
                </span>
                <span className='home'>Dashboard</span>
              </button>
            </Link>
          </div>

          <div className='home-btn'>
            <Link to={`/${username}`}>
              <button>
                <span>
                  <FaIdBadge />
                </span>
                <span className='home'>Profile</span>
              </button>
            </Link>
          </div>

          <div className='dropdown'>
            <span className='nav-category'>
              <span className='category'>Connect</span>
            </span>
            <div className='dropdown-content'>
              <Link to='/groups'>
                <button>
                  <span>
                    <FaUsers />
                  </span>
                  <span className='dd-label'>Groups</span>
                </button>
              </Link>
              <button>
                <span>
                  <FaUserFriends />
                </span>
                <span className='dd-label'>Friends</span>
              </button>
              <Link to='/games'>
                <button>
                  <span>
                    <FaGamepad />
                  </span>
                  <span className='dd-label'>Games</span>
                </button>
              </Link>
            </div>
          </div>

          <div className='dropdown'>
            <span className='nav-category'>
              <span className='category'>Create</span>
            </span>
            <div className='dropdown-content'>
              <Link to='/groups/new'>
                <button>
                  <span>
                    <FaUsers />
                  </span>
                  <span className='dd-label'>Create new Group</span>
                </button>
              </Link>
            </div>
          </div>

          <div className='home-btn settings-btn'>
            <button>
              <span>
                <FaCog />
              </span>
              <span className='home'>Settings</span>
            </button>
          </div>

          <div className='home-btn log-out'>
            <Link to='/' onClick={onLogoutClick}>
              <button>
                <span>
                  <FaSignOutAlt />
                </span>
                <span className='home'>Log Out</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContents;
