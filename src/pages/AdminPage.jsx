import Header from '../components/common/Header'
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '../components/Modal';
import NewGame from '../components/forms/NewGame';
import io from 'socket.io-client'
import Sidebar from '../components/Sidebar';
const socket = io.connect("https://tenis-backend-4rvf.onrender.com")
import { Plus, Minus } from 'lucide-react';

const AdminPage = () => {

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [games, setGames] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1name, setPlayer1name] = useState("");
  const [player2name, setPlayer2name] = useState("");
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
  const [gameResult1, setGameResult1] = useState(0);
  const [gameResult2, setGameResult2] = useState(0);
  const [serveSide, setServeSide] = useState(1);
  const [playerSide, setPlayerSide] = useState(1);
  const [tournament, setTournament] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" })
  }

  const [newGame, setNewGame] = useState({
    player1: "",
    player2: "",
    tournament: ""
  });

  useEffect(() => {
    getResult();
    getPlayers();
    getTournaments();
    getGames();
    sendMessage();
    console.log(players)
    console.log(tournaments)
  }, [player1, player1name, player2, player2name]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      getResult();
    })
  }, [socket]);


  const getResult = async () => {
    const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/currentgame/67e5c15fa1d92ba58cfd680d`)
    const resultats = await response.json();
    setResult1(resultats.result1)
    setResult2(resultats.result2)
    setGameResult1(resultats.gameResult1)
    setGameResult2(resultats.gameResult2)
    setTournament(resultats.tournament)
    setPlayer1(resultats.player1)
    setPlayer2(resultats.player2)
    getPlayer(resultats.player1, 1)
    getPlayer(resultats.player2, 2)
    getTournament(resultats.tournament)
  }

  const incrementResult = async (num) => {
    if (num == 1) {
      const result = result1 + 1
      setResult1(result)
      if (result > result2 + 1 && result >= 11) {
        setTimeout(() => {
          setResult1(0)
          updateResult(1, 0)
          setResult2(0)
          updateResult(2, 0)
          setGameResult1(gameResult1 + 1)
          incrementSetResult(1)
        }, 1000)
      }
    } else {
      const result = result2 + 1
      setResult2(result)
      if (result > result1 + 1 && result >= 11) {
        setTimeout(() => {
          setResult1(0)
          updateResult(1, 0)
          setResult2(0)
          updateResult(2, 0)
          setGameResult2(gameResult2 + 1)
          incrementSetResult(2)
        }, 1000)
      }
    }
    updateResult(num)
    if (result1 > 9 && result2 > 9) {
      changeServe();
    }
    else if ((result1 + result2) % 2 == 1) {
      changeServe();
    }
    sendMessage();
  }

  const incrementSetResult = async (num) => {
    if (num == 1) {
      const result = gameResult1 + 1
      setGameResult1(result)
    } else {
      const result = gameResult2 + 1
      setGameResult2(result)
    }
    updateSetResult(num)
    sendMessage();
  }

  const updateResult = async (num, bla) => {
    if (num == 1) {
      if (bla === 0) {
        const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/result1/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result1: 0 }), // Send the new `result`
        });
      } else {
        const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/result1/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result1: result1 + 1 }), // Send the new `result`
        });
      }

    } else {
      if (bla === 0) {
        const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/result2/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result2: 0 }), // Send the new `result`
        });
      } else {
        const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/result2/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result2: result2 + 1 }), // Send the new `result`
        });
      }
    }
    sendMessage();
  }

  const updateSetResult = async (num, reset) => {
    if (num == 1) {
      if (reset === 0) {
        const response = await fetch(`https://tenis-backend.vercel.app/set1/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameResult1: 0 }), // Send the new `result`
        });
      } else {
        const response = await fetch(`https://tenis-backend.vercel.app/set1/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameResult1: gameResult1 + 1 }), // Send the new `result`
        });
      }

    } else {
      if (reset === 0) {
        const response = await fetch(`https://tenis-backend.vercel.app/set2/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameResult2: 0 }), // Send the new `result`
        });
      } else {
        const response = await fetch(`https://tenis-backend.vercel.app/set2/67e5c15fa1d92ba58cfd680d`, {
          method: "PUT", // or "PATCH"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameResult2: gameResult2 + 1 }), // Send the new `result`
        });
      }
    }
    sendMessage();
  }

  function getPlayers() {
    axios.get(`https://tenis-backend.vercel.app/api/players`).
      then(players => setPlayers(players.data))
      .catch(err => console.log(err))
  }

  function getGames() {
    axios.get(`https://tenis-backend-4rvf.onrender.com/api/game`).
      then(games => setGames(games.data))
      .catch(err => console.log(err))
  }

  function getTournaments() {
    axios.get(`https://tenis-backend-4rvf.onrender.com/api/tournaments`).
      then(tournaments => setTournaments(tournaments.data))
      .catch(err => console.log(err))
  }

  const getPlayer = async (id, num) => {
    const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/players/${id}`)
    const bla = await response.json();
    if (num == 1) {
      setPlayer1name(bla.name)
    } else {
      setPlayer2name(bla.name)
    }

  }

  const getTournament = async (id, num) => {
    const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/tournaments/${id}`)
    const bla = await response.json();
    setTournamentName(bla.title)

  }

  const saveGame = async () => {
    const { success, message } = await fetch(`https://tenis-backend-4rvf.onrender.com/api/game/`, {
      method: "POST", // or "PATCH"
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player1: player1, player2: player2, result1: gameResult1, result2: gameResult2, tournament: tournament, winner: 1, player1name: player1name, player2name: player2name }),
      // Send the new `result`
    });
    if (!success) {
      console.log(message)
    } else {
      console.log(message)
    }
    getGames();
    sendMessage();
  }

  const reset = async () => {
    setResult1(0)
    setResult2(0)
    setGameResult1(0)
    setGameResult2(0)
    updateResult(1, 0)
    updateResult(2, 0)
    updateSetResult(1, 0)
    updateSetResult(2, 0)
    sendMessage();
  }

  const handleNewgame = async () => {
    const response = await fetch(`https://tenis-backend-4rvf.onrender.com/api/currentgame/newgame/67e5c15fa1d92ba58cfd680d`, {
      method: "PUT", // or "PATCH"
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player1: newGame.player1, player2: newGame.player2, tournament: newGame.tournament, result1: 0, result2: 0, gameResult1: 0, gameResult2: 0 }), // Send the new `result`
    });
    if (!success) {
      console.log(response)
    } else {
      console.log(response)
    }
    console.log("-------------------------------------------")
    console.log(player2 + "asd")
    console.log("-------------------------------------------")
    getResult()
    sendMessage();
  }

  const chechSide = async () => {
    if (playerSide == 1) {
      setPlayerSide(0)
    } else {
      setPlayerSide(1)
    }
  }

  const changeServe = async () => {
    if (serveSide == 1) {
      setServeSide(0)
    } else {
      setServeSide(1)
    }
  }

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10 '>
        <Header title="Admin" />
        <div className="flex justify-center">
          <div className='h-auto w-auto flex justify-center center mt-5 sm:mt-10'>
            <div className='w-40 sm:w-100 h-auto '>
              <div className="flex justify-between">
                <div className=" flex justify-center center">
                  <h1 className='text-2xl font-bold sm:text-5xl'>{playerSide ? player1name : player2name}</h1>
                </div>
                <div className='flex justify-between pr-5 sm:pr-10'>
                  <div className='mt-[-80px] mb-[-88px]'>
                  </div>
                  <div>
                    <h2 className='text-4xl font-bold sm:text-7xl'>{playerSide ? gameResult1 : gameResult2}</h2>
                  </div>
                </div>
              </div>
              <div className="flex justify-center center">
                <h1 className={'text-[120px] p-0 mt-[-20px] mb-[-80px] pr-8 font-bold sm:text-[520px] sm:mt-[-160px] sm:pr-80 ' + (serveSide ? "text-amber-300" : "text-white")}>{playerSide ? result1 : result2}</h1>
              </div>
              <div className="flex justify-center center sm:mt-0 mt-10 items-center">
                {playerSide ? <Plus className="sm:w-20 w-12 h-24" onClick={() => incrementResult(1)} /> : <Plus className="sm:w-20 w-12 h-24" onClick={() => incrementResult(2)} />}
                {playerSide ? <Minus className="sm:w-8 w-4 h-24" onClick={() => incrementResult(1)} /> : <Minus className="sm:w-8 w-4 h-24" onClick={() => incrementResult(2)} />}
              </div>
            </div>
            <div className='w-40 sm:w-100 h-auto'>
              <div className="flex justify-between">
                <div className='flex justify-between pl-5 sm:pl-10'>
                  <div>
                    <h2 className='text-4xl font-bold sm:text-7xl'>{!playerSide ? gameResult1 : gameResult2}</h2>
                  </div>
                  <div className='mt-[-80px] mb-[-88px]'>
                  </div>
                </div>
                <div className=" flex justify-center center">
                  <h1 className='text-2xl font-bold sm:text-5xl'>{!playerSide ? player1name : player2name}</h1>
                </div>
              </div>
              <div className="flex justify-center center">
                <h1 className={'text-[120px] p-0 mt-[-20px] mb-[-80px] pl-8 font-bold sm:text-[520px] sm:mt-[-160px] sm:pl-80 ' + (!serveSide ? "text-amber-300" : "text-white")}>{!playerSide ? result1 : result2}</h1>
              </div>
              <div className="flex justify-center center sm:mt-0 mt-10 items-center">
                {!playerSide ? <Plus className="sm:w-20 w-12 h-24" onClick={() => incrementResult(1)} /> : <Plus className="sm:w-20 w-12 h-24" onClick={() => incrementResult(2)} />}
                {!playerSide ? <Minus className="sm:w-8 w-4 h-24" onClick={() => incrementResult(1)} /> : <Minus className="sm:w-8 w-4 h-24" onClick={() => incrementResult(2)} />}
              </div>
            </div>
          </div>

        </div>
        <div class="flex justify-center">
          <button onClick={() => setOpen(true)} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm">
            New game
          </button>
          <button onClick={() => saveGame()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm">
            Save
          </button>
          <button onClick={() => reset()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm">
            Reset
          </button>
          <button onClick={() => reset()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm hidden sm:block">
            Change serve
          </button>
          <button onClick={() => chechSide()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm hidden sm:block">
            Change side
          </button>
        </div>
        <div class="sm:hidden flex justify-center">
          <button onClick={() => changeServe()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm">
            Change serve
          </button>
          <button onClick={() => chechSide()} class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm ">
            Change side
          </button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
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
                        <option value={player1} disabled selected>Choose your player</option>
                        {
                          players.map(player => {
                            return (<option class="pr-4" value={player._id} key={player._id} required >{player.name + " " + player.surname}</option>
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
        <div class="flex justify-center pl-2 pt-5">
          {
            games.map(game => {
              return (
                <div className="flex">
                  <div>{game.result1 > game.result2 ? (<h2 className="text-[14px] font-bold pr-1">{game.player1name}</h2>) : (<h2 className="text-[14px] font-bold pr-1">{game.player2name}</h2>)} </div>
                  <div>{game.result1 > game.result2 ? (<h2 className="text-[14px]  pr-1">{game.result1}</h2>) : (<h2 className="text-[14px]  pr-1">{game.result2}</h2>)} </div>
                   
                  <div>{game.result1 > game.result2 ? (<h2 className="text-[14px]  pr-1">{game.result2}</h2>) : (<h2 className="text-[14px]  pr-1">{game.result1}</h2>)} </div>
                  <div>{game.result1 > game.result2 ? (<h2 className="text-[14px] pr-4">{game.player2name}</h2>) : (<h2 className="text-[14px]  pr-4">{game.player1name}</h2>)} </div>

                </div>
              )
            })
          }
        </div>


      </div>
    </div>
  )
}

export default AdminPage