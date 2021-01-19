import styled from 'styled-components';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import Sidebar from '../Sidebar/Sidebar';

const UserDashboard = () => {
  return (
    <StyledMain>
      <h1>User's Dashboard</h1>
      <nav>
        <Sidebar />
      </nav>
      <div className='activity-feed'>
        <ActivityFeed></ActivityFeed>
      </div>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.teal};

  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  h1 {
    color: white;
    text-align: center;
    margin: 5rem;
    margin-bottom: 2rem;
  }
`;

export default UserDashboard;
