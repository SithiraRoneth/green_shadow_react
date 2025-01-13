// import { useState } from "react";
// import {ChevronFirst, Home, LogOut, Flower2, LandPlot} from "lucide-react";
// import {Link} from "react-router";
//
// export default function Navigation() {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//
//     return (
//         <aside
//             className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${
//                 isCollapsed ? "w-16" : "w-64"
//             }`}
//         >
//             <nav className="h-full flex flex-col">
//                 {/* Header */}
//                 <div className="p-4 pb-2 flex justify-between items-center">
//                     {/* Logo */}
//                     {!isCollapsed && (
//                         // <img className="w-32" src="/logo.png" alt="Logo" />
//                         <h2 className='font-bold text-green-800 20'>Green Shadow</h2>
//                     )}
//                     {/* Collapse Button */}
//                     <button
//                         className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                     >
//                         <ChevronFirst
//                             className={`transition-transform duration-300 ${
//                                 isCollapsed ? "rotate-180" : ""
//                             }`}
//                         />
//                     </button>
//                 </div>
//
//                 {/* Navigation Links */}
//                 <ul className="flex-1 flex flex-col mt-6 space-y-6 px-2">
//                     <Link to='/dash'><li className="p-3 rounded-md hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-4">
//                         <Home className="w-6 h-6 text-gray-700"/>
//                         {!isCollapsed && (
//                             <span className="text-gray-700">Dashboard</span>
//                         )}
//                     </li>
//                     </Link>
//
//                     <Link to='/crops'><li className="p-3 rounded-md hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-4">
//                         <Flower2 className="w-6 h-6 text-gray-700"/>
//                         {!isCollapsed && (
//                             <span className="text-gray-700">Crops</span>
//                         )}
//                     </li>
//                     </Link>
//                     <li className="p-3 rounded-md hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-4">
//                         <LandPlot className="w-6 h-6 text-gray-700"/>
//                         {!isCollapsed && (
//                             <span className="text-gray-700">Fields</span>
//                         )}
//                     </li>
//                     <li className="p-3 rounded-md hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-4">
//                         <LogOut className="w-6 h-6 text-gray-700" />
//                         {!isCollapsed && (
//                             <span className="text-gray-700">Staff</span>
//                         )}
//                     </li>
//                 </ul>
//
//                 {/* Footer or Additional Space */}
//                 <div className="p-4">{/* Add footer or bottom items if needed */}</div>
//             </nav>
//         </aside>
//     );
// }

// import {useState} from "react";
// import {Link} from "react-router-dom"; // Use react-router-dom for compatibility
// import {ChevronFirst} from "lucide-react"; // Ensure proper icon import
//
// export default function Navigation() {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//
//     return (
//         <header className="bg-cyan-700 shadow-lg text-white font-bold mt-5 mx-4 md:mx-12 rounded-l-3xl rounded-r-3xl">
//             <nav className="px-4 py-4">
//                 {/* Header - Logo and Toggle */}
//                 <div className="flex justify-between items-center md:hidden">
//                     {/* Logo */}
//                     <span className="text-xl">Green Shadow</span>
//
//                     {/* Toggle Button */}
//                     <button
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                         className="text-white focus:outline-none"
//                     >
//                         <ChevronFirst
//                             className={`transition-transform duration-300 ${
//                                 isCollapsed ? "rotate-180" : ""
//                             }`}
//                         />
//                     </button>
//                 </div>
//
//                 {/* Navigation Links */}
//                 <ul
//                     className={`mt-4 md:mt-0 flex-col md:flex-row md:flex ${
//                         isCollapsed ? "flex" : "hidden"
//                     } space-y-4 md:space-y-0 md:space-x-6 items-center md:justify-center`}
//                 >
//                     <li>
//                         <Link
//                             to="/dash"
//                             className="hover:underline hover:text-cyan-300 transition duration-300"
//                         >
//                             DashBoard
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/crops"
//                             className="hover:underline hover:text-cyan-300 transition duration-300"
//                         >
//                             Crops
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     );
// }


import {useState} from "react";
import {Link} from "react-router";
import {Axe, ChevronFirst, Flower2, Home, LandPlot, Leaf, PersonStanding, Tractor, User} from "lucide-react";

export default function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

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
                            to="/dash"
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

                {/* Profile Icon */}
                <div className="hidden md:flex items-center">
                    <Link to="/profiles" className="hover:text-green-600 transition duration-300">
                        <User className="w-6 h-6"/>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
