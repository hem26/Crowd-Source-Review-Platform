import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const UserHeader = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboards`, {
            withCredentials: true,
        })
        .then((res) => setDisplay(res.data.msg))
        .catch((err) => setDisplay(err.message));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/logout`, {
                withCredentials: true,
            });
            navigate("/");
        } catch (error) {
            setDisplay(error.message);
        }
    };

    return (
        <header className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-md relative">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/home" className="text-xl font-semibold">
                    <span className="text-3xl font-bold text-blue-400 tracking-wide">
                        ReviewMosaic
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Nav Menu */}
                <nav className={`md:flex md:items-center md:gap-6 text-lg font-medium ${isOpen ? "block" : "hidden"} md:block`}>
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 items-center">
                        <li><Link to="/home" className="hover:text-blue-400 transition duration-300">Home</Link></li>
                        <li><Link to="/add-review" className="hover:text-blue-400 transition duration-300">Add Review</Link></li>
                        <li><Link to="/manage-review" className="hover:text-blue-400 transition duration-300">Manage Review</Link></li>

                        {/* User Icon Toggle */}
                        <li className="md:relative">
                            <button onClick={toggleUserMenu}>
                                <UserCircleIcon className="h-8 w-8  text-gray-300 hover:text-white mt-2" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10">
                                    <div className="px-4 py-2 text-sm border-b border-gray-700">{display}</div>
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700 text-sm">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm">Logout</button>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default UserHeader;
