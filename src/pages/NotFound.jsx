import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        
        <h1 className="text-[120px] font-black text-[#244D3F] leading-none tracking-tighter">
          404
        </h1>

        <h2 className="text-3xl font-bold text-slate-900 mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-6 leading-relaxed">
          Looks like this friendship link is broken. The page 
          you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#244D3F] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-[#1a3a2f] transition-all shadow-sm"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;