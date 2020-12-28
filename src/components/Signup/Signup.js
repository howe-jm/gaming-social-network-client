import styled from 'styled-components';
import NavBar from '../Home/NavBar/NavBar';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <>
      <NavBar></NavBar>
      <StyledMain>
        <div>
          <h1>Join the best gaming community in the world!</h1>
          <ul>
            <li>
              <span>-</span>Create your own gamer profile
            </li>
            <li>
              <span>-</span>Find and connect with gaming groups
            </li>
            <li>
              <span>-</span>Connect with gamers that share your
            </li>
            <li>
              <span>-</span>Share your gaming accomplishments with the world
            </li>
          </ul>
        </div>
        <SignupForm></SignupForm>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 8rem;
  grid-gap: 3.2rem;

  div {
    width: 100%;

    h1 {
      color: #fff;
      margin-bottom: 2.4rem;
      font-size: 2.4rem;
    }

    ul {
      color: #fff;

      li {
        margin-bottom: 0.8rem;

        span {
          margin-right: 0.8rem;
          border-radius: 100%;
        }
      }
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    height: 100vh;
    align-items: center;
    justify-items: center;
    grid-gap: 4.8rem;

    div {
      h1 {
        font-size: 3.2rem;
      }
    }
  }
`;

export default Signup;
