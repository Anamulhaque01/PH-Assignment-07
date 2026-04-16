import React, { useState } from 'react';
import { HomeIcon, ClockIcon, ChartBarIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
        { name: "Timeline", path: "/timeline", icon: <ClockIcon className="w-5 h-5" /> },
        { name: "Stats", path: "/stats", icon: <ChartBarIcon className="w-5 h-5" /> },
    ];

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-[5px] text-sm font-semibold transition-all duration-100 ${
            isActive
                ? "bg-[#244D3F] text-white"
                : "text-slate-500 hover:bg-gray-50 hover:text-slate-700"
        }`;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Keen<span className="text-[#244D3F]">Keeper</span>
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink key={item.name} to={item.path} className={linkClasses}>
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}
                    </div>


                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-500 hover:text-slate-700 p-2"
                        >
                            {isOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>


            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-2 shadow-lg">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)} 
                            className={linkClasses}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;