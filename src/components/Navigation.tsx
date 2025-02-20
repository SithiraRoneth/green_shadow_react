import { useState } from "react";
import { Link } from "react-router";
import { Axe, ChevronFirst, Flower2, Home, LandPlot, Leaf, PersonStanding, Tractor, User } from "lucide-react";

export default function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredLink, setHoveredLink] = useState("home");

    return (
        <header className="bg-green-900 shadow-lg text-white font-bold mt-5 mx-4 md:mx-12 rounded-full sticky top-5 z-0">
            <nav className="px-4 py-4 flex items-center justify-between relative">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-green-600 transition duration-300">
                        <Leaf />
                    </Link>
                </div>

                {/* Toggle Button for Mobile */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-white focus:outline-none md:hidden"
                >
                    <ChevronFirst
                        className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
                    />
                </button>

                {/* Navigation Links */}
                <ul
                    className={`absolute md:static top-20 left-0 w-full rounded-lg  md:w-auto bg-green-800 md:bg-transparent shadow-md md:shadow-none md:flex 
                        ${isCollapsed ? "flex" : "hidden"} flex-col md:flex-row items-center py-3 md:py-0 space-y-2 md:space-y-0 md:space-x-6 z-20 transition-all duration-300`}
                >
                    {[
                        { name: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
                        { name: "crops", label: "Crop", icon: <Flower2 className="w-5 h-5" /> },
                        { name: "fields", label: "Field", icon: <LandPlot className="w-5 h-5" /> },
                        { name: "staffs", label: "Staff", icon: <PersonStanding className="w-5 h-5" /> },
                        { name: "vehicles", label: "Vehicle", icon: <Tractor className="w-5 h-5" /> },
                        { name: "equips", label: "Equipment", icon: <Axe className="w-5 h-5" /> },
                    ].map((item) => (
                        <li key={item.name}>
                            <Link
                                to={`${item.name}`}
                                className="hover:text-green-400 transition duration-300 flex items-center"
                                onMouseEnter={() => setHoveredLink(item.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <span className="flex items-center justify-center w-[90px] p-2">
                                    {hoveredLink === item.name ? item.icon : item.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Profile Icon */}
                <div className="hidden md:flex items-center">
                    <Link to="profiles" className="hover:text-green-600 transition duration-300">
                        <User className="w-6 h-6" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
