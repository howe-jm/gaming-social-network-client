import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../../config';

const UserAbout = ({ profile, userIsOwner }) => {
    const user = profile;
    const [edit, setEdit] = useState(false);
    const [about, setAbout] = useState(user.user_bio);
    const [hardware, setHardware] = useState(user.preferred_hardware);

    const handleEdit = () => {
        if (edit) {
            return (
                <StyledText>
                    <div className='edit-bio'>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            defaultValue={about}
                        ></textarea>
                        <div className='bottom-controls'>
                            <select
                                onChange={(e) => setHardware(e.target.value)}
                            >
                                <option hidden value>
                                    Change hardware
                                </option>
                                <option value='pc'>PC</option>
                                <option value='playstation'>PlayStation</option>
                                <option value='xbox'>Xbox</option>
                                <option value='wii'>Wii</option>
                                <option value='switch'>Switch</option>
                                <option value='mobile'>Mobile</option>
                                <option value='vr'>VR</option>
                            </select>
                            <button
                                onClick={() => {
                                    handleUpdateBio();
                                    handleUpdateHardware();
                                    setEdit((c) => !c);
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </StyledText>
            );
        } else {
            return (
                <div className='bio-text'>
                    <p>{about ? about : 'no bio yet'}</p>
                </div>
            );
        }
    };

    const handleUpdateHardware = async () => {
        try {
            const res = await fetch(
                `${API_URL}/profiles/${user.username}/hardware`,
                {
                    method: 'PATCH',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        hardware: hardware,
                        user_id: user.user_id,
                    }),
                }
            );
            const data = await res.json();
            console.log(data);
            setHardware(data.profile.preferred_hardware);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateBio = async () => {
        try {
            const res = await fetch(`${API_URL}/profiles/${user.username}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    user_bio: about,
                    user_id: user.user_id,
                }),
            });
            const data = await res.json();
            console.log(data);
            setAbout(data.profile.user_bio);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <StyledWrapper>
            <div className='about-body'>
                <header>
                    <span>About me:</span>
                    {userIsOwner === true ? (
                        <button onClick={() => setEdit((c) => !c)}>Edit</button>
                    ) : null}
                </header>
                {handleEdit()}

                <div className='preferred-hardware'>
                    <span>Preferred Hardware:</span>
                    {hardware ? (
                        <span>
                            {hardware.charAt(0).toUpperCase() +
                                hardware.slice(1)}
                        </span>
                    ) : (
                        <span>None yet</span>
                    )}
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.main`
    .about-body {
        color: white;
        width: 100%;

        header {
            display: flex;
            justify-content: space-between;

            span {
                padding: 1rem 3rem 1.5rem 3.5rem;
                margin-left: 2rem;
                border-bottom: solid 2px white;
            }

            button {
                border: solid 2px white;
                background-color: transparent;
                color: white;
                font-size: 1.3rem;
                padding: 0.5rem 1rem 0.5rem 1rem;
                margin-top: 1rem;
                margin-right: 2rem;
            }
            button:focus {
                outline: none;
            }
        }

        .bio-text {
            margin: auto;
            height: 30rem;
            width: 95%;
            margin-top: 1rem;
            padding: 1rem;

            p {
                line-height: 3rem;
            }
        }

        .preferred-hardware {
            span {
                padding: 1rem 3rem 0.5rem 0.5rem;
                margin-left: 2rem;
            }
        }
    }

    @media all and (min-width: 970px) {
        .about-body {
            header {
                span {
                    margin-top: 3rem;
                }
                button {
                    width: 8rem;
                    margin-right: 15rem;
                    margin-top: 3rem;
                }
            }

            .bio-text {
                width: 70%;
                word-wrap: normal;
            }
        }
    }
`;

const StyledText = styled.div`
    .edit-bio {
        width: 100%;
        text-align: center;

        textarea {
            width: 95%;
            margin-top: 1rem;
            height: 40rem;
            padding: 1rem;
            background-color: rgb(84, 84, 84, 0.7);
            color: white;
            line-height: 3rem;
        }
        textarea:focus {
            outline: none;
        }

        .bottom-controls {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
        }
    }

    @media all and (min-width: 970px) {
        .edit-bio {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 70%;
            margin: auto;
            margin-top: 4rem;

            button {
                width: 10rem;
                margin: auto;
                margin-top: 2rem;
            }
        }
    }
`;

export default UserAbout;
