import {useState} from "react";
import {Link} from "react-router";
import {Axe, ChevronFirst, Flower2, Home, LandPlot, Leaf, PersonStanding, Tractor, User} from "lucide-react";

export default function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredLink, setHoveredLink] = useState("home");

    return (
        <header className="bg-green-900 shadow-lg text-white font-bold mt-5  mx-4 md:mx-12 rounded-l-full rounded-r-full">
            <nav className="px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-green-600 transition duration-300 ">
                        <Leaf/>
                    </Link>
                </div>

                {/* Toggle Button for Mobile */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-white focus:outline-none md:hidden"
                >
                    <ChevronFirst
                        className={`transition-transform duration-300 ${
                            isCollapsed ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {/* Navigation Links */}
                <ul
                    className={`absolute md:static top-full left-0 w-full md:w-auto bg-cyan-700 md:bg-transparent ${
                        isCollapsed ? "flex" : "hidden"
                    } flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6 items-center py-4 md:py-0 z-10`}
                >
                    <li>
                        <Link
                            to="/home"
                            className="hover:text-green-600 transition duration-300 felx items-center"
                            onMouseEnter={() => setHoveredLink("home")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[50px]">
                                {hoveredLink === "home" ? <Home className="w-5 h-5"/> : "Home"}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/crops"
                            className="hover: hover:text-green-600 transition duration-300 felx items-center"
                            onMouseEnter={() => setHoveredLink("crop")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[50px]">
                                {hoveredLink === "crop" ? <Flower2 className="w-5 h-5"/> : "Crop"}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/fields"
                            className="hover: hover:text-green-600 transition duration-300 felx items-center"
                            onMouseEnter={() => setHoveredLink("field")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[50px]">
                                {hoveredLink === "field" ? <LandPlot className="w-5 h-5"/> : "Field"}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/staffs"
                            className="hover:text-green-600 transition duration-300 flex items-center"
                            onMouseEnter={() => setHoveredLink("staff")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[50px] p-2">
                                {hoveredLink === "staff" ? <PersonStanding className="w-5 h-5"/> : "Staff"}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/vehicles"
                            className="hover:text-green-600 transition duration-300 flex items-center"
                            onMouseEnter={() => setHoveredLink("vehicle")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[50px] p-2">
                                {hoveredLink === "vehicle" ? <Tractor className="w-5 h-5"/> : "Vehicle"}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/equips"
                            className="hover:text-green-600 transition duration-300 flex items-center"
                            onMouseEnter={() => setHoveredLink("equipment")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="flex items-center justify-center w-[90px] p-2">
                                {hoveredLink === "equipment" ? <Axe className="w-5 h-5"/> : "Equipment"}
                            </span>
                        </Link>
                    </li>

                </ul>

                <div className="hidden md:flex items-center">
                    <Link to="/profiles" className="hover:text-green-600 transition duration-300">
                        <User className="w-6 h-6"/>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
