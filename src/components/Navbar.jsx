import React from 'react'
import { HomeIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const navItems = [
        { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
        { name: "Timeline", path: "/timeline", icon: <ClockIcon className="w-5 h-5" /> },
        { name: "Stats", path: "/stats", icon: <ChartBarIcon className="w-5 h-5" /> },
    ];

    return (
    <div>
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                    Keen<span className="text-[#244D3F]">Keeper</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-[5px]  text-sm font-semibold transition-all duration-100 ${
                            isActive
                            ? "bg-[#244D3F] text-white"
                            : "text-slate-500 hover:bg-gray-50 hover:text-slate-700"
                        }`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                    ))}
                </div>
                </div>
            </nav>
    </div>
    )
}

export default Navbar
