import { Outlet, NavLink, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


    const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">

        <Navbar></Navbar>

        <main className="max-w-7xl mx-auto px-6 py-8">
            <Outlet />
        </main>

        <Footer></Footer>
        
        </div>
    );
};

export default MainLayout;