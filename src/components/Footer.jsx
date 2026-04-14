import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <div className="bg-[#244D3F] w-full text-white">
            <footer className="max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center">
                
                <div className="text-center flex flex-col items-center mb-16">
                    
                    <div className="text-5xl font-black tracking-tight mb-6">
                        KeenKeeper
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed max-w-lg mb-10">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture 
                        the relationships that matter most.
                    </p>

                    <h4 className="font-semibold text-lg text-white mb-6">Social Links</h4>
                    <div className="flex gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition hover:bg-white/90">
                            <FontAwesomeIcon icon={faInstagram} className="text-[#244D3F] text-xl" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition hover:bg-white/90">
                            <FontAwesomeIcon icon={faFacebookF} className="text-[#244D3F] text-xl" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition hover:bg-white/90">
                            <FontAwesomeIcon icon={faXTwitter} className="text-[#244D3F] text-xl" />
                        </a>
                    </div>
                </div>


                <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/70">
                    
                    <p>
                        © 2026 KeenKeeper. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition">Cookies</Link>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Footer