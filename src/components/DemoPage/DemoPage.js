import styled from 'styled-components';
import { Link } from 'react-router-dom';


const DemoPage = () => {
        return (
        <div>
            <StyledMain>
                <div className="demoHeading"> 
                    <h1>Welcome to the Gaming Social Network!</h1> 
                    <br />
                    <h2>Connect Hard, Win Harder</h2>
                </div>
                <div className="demoGetStarted">
                <h3>Signup</h3> 
                <p>
                    Upon reaching the home page, you will be prompted 
                    to log in or to create an account. Here, you will input 
                    all the required fields and, on submission, be 
                    redirected to your dashboard!
                </p>
                <br />
                <h3>Login</h3>
                <p>
                    If you already have an account, simply enter your email 
                    and password to be redirected to your dashboard upon
                    submission!
                </p>
                <br />
                <h3>Dashboard</h3>
                <p>Once you have reached your dashboard, you can...</p>
                <ol>
                    <li>Edit your profile! (i.e. - avatar, about, banner, etc.)</li>
                    <li>Create and add to a list of your favorite games!</li>
                    <li>Find and connect with game groups!</li>
                    <li>Add other gamers as friends!</li>
                    <li>Share your accomplishments with others!</li>
                    <li>Create, share and read posts to the community!</li>
                </ol>
                    <div>
                        <Link to="/"><button>Let's Go!</button></Link>
                    </div>
                </div>
            </StyledMain>
        </div>
    );
};


const StyledMain = styled.main`
    .main {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
    }

    .demoHeading {
        background-color: aliceblue;
        font-size: small;
        text-align: center;
    }

    .demoGetStarted {
        margin: 1rem .5rem 0 .5rem;
        background-color: aliceblue;
        padding: 1rem;
        margin-bottom: 2rem;

    }
`;

export default DemoPage;