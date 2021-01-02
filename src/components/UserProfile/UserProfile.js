import React, { Component, useState, useEffect } from 'react';
import VertNavBar from '../VerticalNavBar/VertNavBar';
import { Route, Switch, Link } from 'react-router-dom';

import styled from 'styled-components';

const username = 'donotle98'; //this is just for a mockup

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    // useEffect(() => {
    //     //Fetch the user profile using the username

    //     return fetch(
    //         `https://gaming-social-network.herokuapp.com/users/${username}`
    //     )
    //         .then((res) => res.json())
    //         .then((user) => setProfile(user.profile));
    // }, []);

    useEffect(() => {
        setProfile({
            profile_url:
                'https://gaming-social-network.s3-us-west-2.amazonaws.com/avatar_placeholder.png',
            banner_url:
                ' https://gaming-social-network.s3-us-west-2.amazonaws.com/banner.jpg',
            user_location: 'Bentonville',
            external_usernames: '@dr0wzie',
            preferred_hardware: 'pc',
            gamer_type: true,
        });
    }, []);

    return (
        <StyledMain>
            <div className='user-container'>
                <nav>
                    <VertNavBar />
                </nav>
                <div className='user-profile'>
                    <div className='header'>
                        <img
                            src={profile.banner_url}
                            alt='banner'
                            className='banner-img'
                        ></img>
                        <div className='user-tags-img'>
                            <img
                                src={profile.profile_url}
                                alt='users default'
                                className='user-image'
                            ></img>
                            <div className='user-tags'>
                                <span>{username}</span>
                                <span className='user-gamertag'>
                                    {profile.external_usernames}
                                </span>
                            </div>
                        </div>
                        <div className='edit-profile-btn'>
                            <Link to='/editProfile'>
                                <button>Edit Profile</button>
                            </Link>
                        </div>
                        <div className='control-center'>
                            <div>
                                <Link to='/userAbout'>
                                    <button>About</button>
                                </Link>
                            </div>
                            <div>
                                <Link to='/userGames'>
                                    <button>Games</button>
                                </Link>
                            </div>
                            <div>
                                <Link to='/userImages'>
                                    <button>Images</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='user-body'>
                        <h1>stuff here</h1>
                        <Switch>
                            <Route exact path='/editProfile'></Route>
                            <Route exact path='/userAbout'></Route>
                            <Route exact path='/userGames'></Route>
                            <Route exact path='/userImages'></Route>
                        </Switch>
                    </div>
                </div>
                <div className='doms-sidebar'></div>
            </div>
        </StyledMain>
    );
};
const StyledMain = styled.main`
    nav {
        position: fixed;
        left: 0;
        z-index: 1000;
    }
    .user-profile {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0rem;

        .header {
            position: fixed;
            top: 0;
            width: 100%;
            height: 20rem;

            .banner-img {
                width: 100%;
                height: 100%;
                opacity: 0.6;
                z-index: -1000;
            }

            .user-tags-img {
                position: absolute;
                bottom: 6rem;
                display: flex;
                img {
                    width: 5rem;
                    height: 5rem;
                    margin-left: 2rem;
                    border-radius: 10rem;
                    margin-right: 2rem;
                }
                .user-tags {
                    color: white;
                    display: flex;
                    flex-direction: column;
                    font-size: 2.3rem;
                    padding-top: 0.3rem;

                    .user-gamertag {
                        padding-top: 0.3rem;
                        font-size: 1.7rem;
                    }
                }
            }
            .edit-profile-btn {
                position: absolute;
                top: 2rem;
                right: 2rem;
                font-size: 1.2rem;

                button {
                    padding: 0.75rem 1rem 0.75rem 1rem;
                    border: none;
                }
            }
            .control-center {
                position: absolute;
                bottom: 1rem;
                display: flex;
                height: 5rem;
                padding-left: 4rem;

                button {
                    margin-right: 2rem;
                    color: white;
                    border: none;
                    background-color: transparent;
                    padding: 2rem;
                }
                button:focus {
                    border-bottom: solid 1px white;
                    outline: none;
                }
            }
        }
        .user-body {
            position: relative;
            top: 26rem;
        }
    }

    @media all and (min-width: 750px) {
        //     .user-profile {
        //         width: 70%;
        //         height: 100%;
        //         position: fixed;
        //         left: 20rem;

        //         .header {
        //             position: fixed;
        //             top: 0;
        //             width: 70%;
        //             height: 25rem;

        //             .banner-img {
        //                 width: 100%;
        //                 height: 100%;
        //                 opacity: 0.6;
        //             }

        //             .user-tags-img {
        //                 position: absolute;
        //                 bottom: 7rem;
        //                 display: flex;
        //                 img {
        //                     width: 8rem;
        //                     height: 8rem;
        //                     margin-left: 5rem;
        //                     border-radius: 10rem;
        //                     margin-right: 2rem;
        //                 }
        //                 .user-tags {
        //                     color: white;
        //                     display: flex;
        //                     flex-direction: column;
        //                     font-size: 3.5rem;

        //                     .user-gamertag {
        //                         font-size: 2.4rem;
        //                     }
        //                 }
        //             }
        //             .edit-profile-btn {
        //                 font-size: 1.7rem;
        //                 bottom: 0;
        //                 top: 19rem;

        //                 button {
        //                     padding: 0.75rem 1rem 0.75rem 1rem;
        //                     border: none;
        //                 }
        //             }
        //             .control-center {
        //                 position: absolute;
        //                 bottom: 1rem;
        //                 display: flex;
        //                 height: 5rem;
        //                 padding-left: 5rem;

        //                 button {
        //                     margin-right: 2rem;
        //                     color: white;
        //                     border: none;
        //                     background-color: transparent;
        //                     padding: 2rem;
        //                 }
        //                 button:focus {
        //                     border-bottom: solid 1px white;
        //                     outline: none;
        //                 }
        //             }
        //         }
        //         .user-body {
        //             position: relative;
        //             top: 26rem;
        //         }
        //     }
    }
`;

export default UserProfile;
