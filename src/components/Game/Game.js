import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { API_URL } from '../../config';
import notFavorited from './images/notfavorited.svg';
import isFavorited from './images/favorited.svg';

// @TODO - Please add number of people who have favorited the game on the front-end
// @TODO - Get rid of borders
// @TODO - Drop sidebar in
// @TODO - Use proper theme colors

const Game = () => {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorited, setFavorited] = useState(null);
    const [totalFavs, setTotalFavs] = useState(null);
    const [info, setInfo] = useState(false);
    let history = useHistory();
    let params = useParams();

    const isFavorited = async (gameId) => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            return history.push('/404');
        }
        try {
            const res = await fetch(
                `${API_URL}/favorites/${JSON.stringify(gameId)}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!data.success) {
                setFavorited(false);
                return setLoading(false);
            }

            setFavorited(true);
            return setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const getGame = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(
                `https://api.rawg.io/api/games/${params.id}?key=2a91788799104cdabdd2ed6da39afffb`
            );

            if (!res.ok) {
                return setError('Could not find that game');
            }

            const data = await res.json();

            console.log(data);

            if (!data) {
                return setError('Could not find that game');
            }
            setGame(data);

            return await isFavorited(data.id);
        } catch (err) {
            return setError('Could not find that game');
        }
    };

    const getFavoriteCount = async () => {
        try {
            const token = localStorage.getItem('jwt');

            if (!token) {
                return history.push('/404');
            }
            const res = await fetch(
                `${API_URL}/favorites/count?gameId=${game.id}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            console.log(data);

            return setTotalFavs(data.favoriteCount);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getGame();
        isFavorited();
        getFavoriteCount();
    }, [params.id, history]);

    const favoriteGame = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    game,
                    game_id: JSON.stringify(game.id),
                }),
            });
            const data = await res.json();
            if (!data.success) {
                return;
            }
            return setFavorited(true);
        } catch (err) {
            console.log(err);
        }
    };

    const unfavoriteGame = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const res = await fetch(
                `${API_URL}/favorites/${JSON.stringify(game.id)}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                return setFavorited(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleMoreInfo = () => {
        if (info) {
            return (
                <div>
                    <p>{game.description_raw}</p>
                </div>
            );
        }
    };

    const renderGame = () => {
        if (loading) {
            return (
                <Loader
                    type='TailSpin'
                    color='#14FFEC'
                    height={100}
                    width={100}
                    className='spinner'
                />
            );
        }

        return game && !loading ? (
            <StyledMain className='gamePage_gameContainer'>
                <div className='control-center'>
                    <button onClick={() => history.goBack()}>Back</button>
                    {!favorited ? (
                        <div className='favorite'>
                            <button onClick={favoriteGame}>
                                <img src={notFavorited} alt='Favorite' />
                            </button>
                        </div>
                    ) : (
                        <div className='unfavorite'>
                            <button onClick={unfavoriteGame}>
                                <img src={isFavorited} alt='Unfavorite' />
                            </button>
                        </div>
                    )}
                </div>
                <div className='gamePage_title'>
                    <h1>
                        <a href={`${game.website}`}>{game.name}</a>
                    </h1>
                </div>

                {/* game total favs are here */}
                <div>
                    <span>{totalFavs}</span>
                </div>

                <div className='gamePage_details'>
                    <div className='gamePage_image'>
                        <img src={game.background_image} alt={game.name} />
                    </div>

                    <div className='gamePage_desc'>
                        <p>{game.reddit_description}</p>
                        <div className='genres'>
                            <span>Genres: </span>
                            {game.genres.map((genre) => (
                                <div className='each-genre'>
                                    <span>{genre.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className='platforms'>
                            <span>Playable on: </span>
                            {game.platforms.map((platform, y) => (
                                <div className='each-platform'>
                                    <span key={y}>
                                        {platform.platform.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setInfo((c) => !c)}>
                            More Info
                        </button>
                        {handleMoreInfo()}
                    </div>
                </div>
            </StyledMain>
        ) : null;
    };

    return !error ? renderGame() : <p>{error}</p>;
};

const StyledMain = styled.main`
    padding: 2rem;
    background-color: #0d7377;
    min-height: 100vh;

    .control-center {
        display: flex;
        justify-content: space-between;
    }
    .gamePage_title {
        color: white;
        display: flex;
        margin-top: 3rem;
        margin-bottom: 2rem;
        justify-content: center;

        h1 {
            font-size: 2.5rem;
            text-decoration: underline;
        }
    }

    .gamePage_details {
        .gamePage_image {
            display: flex;
            flex-direction: row;
            justify-content: center;
            img {
                width: 100%;
                box-shadow: 7px 7px 10px black;
            }
        }

        .gamePage_desc {
            margin-top: 4rem;
            text-align: center;
            color: white;

            .genres {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 2rem;
                .each-genre {
                    margin-left: 1rem;
                }
            }
            .platforms {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-top: 2rem;
                .each-platform {
                    margin-top: 1rem;
                }
            }
            p {
                color: white;
                word-wrap: break-word;
                line-height: 2.5rem;
            }
            button {
                margin-top: 2rem;
                margin-bottom: 3rem;
            }
        }
    }
    @media all and (min-width: 590px) {
        .gamePage_title {
            color: white;
            h1 {
                font-size: 2.5rem;
                text-decoration: none;

                a {
                    cursor: pointer;
                }

                a:hover {
                    text-decoration: underline;
                }
            }
        }
        .gamePage_details {
            .gamePage_image {
                img {
                    width: 80%;
                }
            }
            .gamePage_desc {
                .genres {
                    flex-direction: row;
                    align-items: center;

                    .each-genre {
                        margin-left: 1rem;
                        margin-bottom: 1rem;
                    }
                }
                .platforms {
                    flex-direction: row;
                    align-items: center;

                    .each-platform {
                        margin-left: 1rem;
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }
`;

export default Game;
