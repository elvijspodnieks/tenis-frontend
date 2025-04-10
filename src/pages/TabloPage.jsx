import { React, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/common/Header'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io.connect("https://tenis-backend.vercel.app")

const TabloPage = () => {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
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
    const response = await fetch(`https://tenis-backend.vercel.app/api/currentgame/currentgame/67e5c15fa1d92ba58cfd680d`)
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

  function getPlayers() {
    axios.get(`https://todo-rho-swart-35.vercel.app/api/players`).
      then(players => setPlayers(players.data))
      .catch(err => console.log(err))
  }

  function getTournaments() {
    axios.get(`https://todo-rho-swart-35.vercel.app/api/tournaments`).
      then(tournaments => setTournaments(tournaments.data))
      .catch(err => console.log(err))
  }

  const getPlayer = async (id, num) => {
    const response = await fetch(`https://todo-rho-swart-35.vercel.app/api/players/${id}`)
    const bla = await response.json();
    if (num == 1) {
      setPlayer1name(bla.name)
    } else {
      setPlayer2name(bla.name)
    }
  }

  const getTournament = async (id, num) => {
    const response = await fetch(`https://todo-rho-swart-35.vercel.app/api/tournaments/${id}`)
    const bla = await response.json();
    setTournamentName(bla.title)
  }

  return (
    <div className=" center w-full">
      <div className="flex justify-end">
        <NavLink
          to="/"
          className="absolute top-2 right-2 pt-1 pr-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </NavLink>

      </div>
      <div className='h-auto w-auto flex justify-center center mt-20'>
        <div className='w-100 h-auto '>
          <div className="flex justify-between">
          <div className=" flex justify-center center">
            <h1 className='text-5xl font-bold'>{player1name}</h1>
          </div>
          <div className='flex justify-between pr-5 sm:pr-10'>
            <div className='mt-[-80px] mb-[-88px]'>
            </div>
            <div>
              <h2 className='text-5xl font-bold sm:text-7xl'>{gameResult1}</h2>
            </div>
          </div>
          </div>
          <div className="flex justify-center center">
            <h1 className='text-[200px] p-0 mt-[-20px] mb-[-80px] font-bold sm:text-[520px] sm:mt-[-100px] sm:pr-80'>{result1}</h1>
          </div>
        </div>
        <div className='w-100 h-auto'>
          <div className="flex justify-between">
          

          <div className='flex justify-between pl-5 sm:pl-10'>
            <div>
              <h2 className='text-5xl font-bold sm:text-7xl'>{gameResult2}</h2>
            </div>
            <div className='mt-[-80px] mb-[-88px]'>
            </div>
          </div>
          <div className=" flex justify-center center">
            <h1 className='text-5xl font-bold'>{player2name}</h1>
          </div>
          </div>

          <div className="flex justify-center center">
            <h1 className='text-[200px] p-0 mt-[-20px] mb-[-80px] font-bold sm:text-[520px] sm:mt-[-100px] sm:pl-80'>{result2}</h1>
          </div>

        </div>
      </div>
     

    </div>

  )
}

export default TabloPage