import { React, useState, useEffect } from 'react'
import Modal from "../Modal"
import io from 'socket.io-client'
import axios from 'axios';
const URI_BACKEND = import.meta.env.VITE_URI_BACKEND;
const socket = io.connect(URI_BACKEND)



const NewGame = () => {
    const [newGame, setNewGame] = useState({
        player1: "",
        player2: "",
        tournament: ""
    });

    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    const sendMessage = () => {
        socket.emit("send_message", { message: "Hello" })
    }

    useEffect(() => {
        getPlayers();
        getTournaments();
        sendMessage();
    }, []);


    function getPlayers() {
        axios.get(`${URI_BACKEND}api/players`).
            then(players => setPlayers(players.data))
            .catch(err => console.log(err))
    }

    function getTournaments() {
        axios.get(`${URI_BACKEND}api/tournaments`).
            then(tournaments => setTournaments(tournaments.data))
            .catch(err => console.log(err))
    }

    const handleNewgame = async () => {
        const response = await fetch(`${URI_BACKEND}api/currentgame/newgame/67e5c15fa1d92ba58cfd680d`, {
            method: "PUT", // or "PATCH"
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player1: newGame.player1, player2: newGame.player2, tournament: newGame.tournament, result1: 0, result2: 0, gameResult1: 0, gameResult2: 0 }), // Send the new `result`
        });
        if (!success) {
            console.log(response)
        } else {
            console.log(response)
        }
    }

    return (
        <div>
            <Modal>
            <div>
                <form onSubmit={handleNewgame}>
                    <div className="flex justify-center">
                        <div className="w-60 sm:w-110 sm:h-80 h-90 rounded-md bg-white px-5 py-2 ">
                            <h2 className="text-base/7 font-semibold text-gray-900">New game</h2>
                            <div class="justify-between sm:flex pt-3 mb-5">
                                <div className=" justify-center items-start ">
                                    <div class="flex">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                            Player 1
                                        </label>
                                    </div>
                                    <select onChange={(e) => setNewGame({ ...newGame, player1: e.target.value })} id="player1" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-47 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                        <option value="" disabled selected>Choose your player</option>
                                        {
                                            players.map(player => {
                                                return (<option class="pr-4" value={player._id} key={player._id} >{player.name + " " + player.surname}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className=" justify-center items-start pt-4 sm:pt-0">
                                    <div class="flex">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                            Player 2
                                        </label>
                                    </div>
                                    <select onChange={(e) => setNewGame({ ...newGame, player2: e.target.value })} id="player2" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-47 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                        <option value="" disabled selected>Choose your player</option>
                                        {
                                            players.map(player => {
                                                return (<option class="pr-4" value={player._id} key={player._id}>{player.name + " " + player.surname}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="justify-between flex mb-10">
                                <div className=" justify-center items-start ">
                                    <div class="flex">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                            Tournament
                                        </label>
                                    </div>
                                    <select onChange={(e) => setNewGame({ ...newGame, tournament: e.target.value })} id="tournament" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-47 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                        <option value="" disabled selected>Choose your player</option>
                                        {
                                            tournaments.map(tournament => {
                                                return (<option class="pr-4" value={tournament._id} key={tournament._id}>{tournament.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-40 rounded-md bg-gray-700 px-2 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Start
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </Modal>
        </div>
    )
}

export default NewGame