import { React, useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import axios from 'axios';
import Modal from '../Modal';
const URI_BACKEND = "https://tenis-backend-4rvf.onrender.com/"
//const URI_BACKEND = "http://localhost:5000/"


const PRODUCT_DATA = [
    { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
    { id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
    { id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
    { id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
    { id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
    const [players, setPlayers] = useState([]);
    const [open, setOpen] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: "",
        surname: "",
        level: "",
        games: "",
    });

    useEffect(() => {
        getPlayers();
    }, []);

    const handleAddProduct = async () => {
        const { success, message } = await fetch(`${URI_BACKEND}api/players`, {
            method: "POST", // or "PATCH"
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newProduct.name, surname: newProduct.surname, level: newProduct.level, games: newProduct.games }),
            // Send the new `result`
        });
        if (!success) {
            console.log(message)
        } else {
            console.log(message)
        }
        console.log(newProduct)
    };

    function getPlayers() {
        axios.get(`${URI_BACKEND}api/players`).
            then(players => setPlayers(players.data))
            .catch(err => console.log(err))
    }


    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 w-260'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Players List</h2>
                <button onClick={() => setOpen(true)} class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 text-xs sm:text-sm">
            Add new player
          </button>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Surname
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Level
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Games played
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {
                            players.map(player => {
                                return (
                                    <motion.tr
                                        key={player._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {player.name}
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {player.surname}
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {player.level}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{player.games}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
                                    </motion.tr>
                                )
                            })}
                    </tbody>
                </table>
                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div>
                                        <form onSubmit={handleAddProduct}>
                                            <div className="flex justify-center">
                                                <div className="w-110 rounded-md bg-white px-5 py-2 ">
                                                    <h2 className="text-base/7 font-semibold text-gray-900">Add  new player</h2>
                                                    <div class="justify-between flex pt-3">
                                                        <div className=" justify-center items-start ">
                                                            <div class="flex">
                                                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                                                    Name
                                                                </label>
                                                            </div>
                
                                                            <div className="mb-3">
                                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                                    <input placeholder='Jānis'
                                                                        name='name'
                                                                        value={newProduct.name}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" justify-center items-start ">
                                                            <div class="flex">
                                                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                                                    Surname
                                                                </label>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                                    <input placeholder='Bērziņš'
                                                                        name='surname'
                                                                        value={newProduct.surname}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, surname: e.target.value })}
                                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="justify-between flex">
                                                        <div className=" justify-center items-start ">
                                                            <div class="flex">
                                                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                                                    Level
                                                                </label>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                
                                                                    <input placeholder='Beginner'
                                                                        name='level'
                                                                        value={newProduct.level}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, level: e.target.value })}
                                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" justify-center items-start ">
                                                            <div class="flex">
                                                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 ">
                                                                    Games played
                                                                </label>
                                                            </div>
                
                                                            <div className="mb-3">
                                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                
                                                                    <input placeholder='0'
                                                                        name='games'
                                                                        value={newProduct.games}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, games: e.target.value })}
                                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="w-40 rounded-md bg-gray-700 px-2 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
            </div>
        </motion.div>
        
    );
};
export default ProductsTable;