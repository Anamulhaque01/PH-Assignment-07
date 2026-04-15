import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/friends.json")
        .then((res) => res.json())
        .then((data) => {
            setFriends(data);
            setTimeout(() => setLoading(false));
        });
    }, []);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-xl bg-[#244D3F]"></span>
        </div>
        );
    }

    const getStatusStyles = (status) => {
        switch (status) {
        case "overdue": return "bg-red-100 text-red-700";
        case "almost due": return "bg-yellow-100 text-yellow-700";
        case "on-track": return "bg-green-100 text-green-700";
        default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div>
        <section className="text-center py-12  border border-gray-50 border-b-gray-300 mb-10 px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Friends to keep close in your life</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">Your personal shelf of meaningful connections. Browse, tend, and nurture the
            relationships that matter most.</p>
            <button className="bg-[#244D3F] text-white px-6 py-3 rounded-[5px] font-semibold flex items-center gap-2 mx-auto hover:cursor-pointer transition">
            <UserPlusIcon className="w-5 h-5" /> Add a Friend
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-7xl mx-auto">
            {[ 
                { label: 'Total Friends', val: friends.length },
                { label: 'On Track', val: friends.filter(f => f.status === 'on-track').length },
                { label: 'Need Attention', val: friends.length },
                { label: 'Interactions This Month', val: '12' }
            ].map((stat, i) => (
                <div key={i} className="py-10 bg-white rounded-2xl border shadow-sm">
                <p className="text-2xl font-bold text-[#244D3F]">{stat.val}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
            ))}
            </div>
        </section>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {friends.map((friend) => (
        <Link 
            to={`/friend/${friend.id}`} 
            key={friend.id} 
            className="bg-white rounded-[12px] border border-gray-100 p-8 flex flex-col items-center hover:shadow-md transition group"
        >
            {/* Circular Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-white shadow-sm">
                <img 
                    src={friend.picture} 
                    alt={friend.name} 
                    className="w-full h-full object-cover" 
                />
            </div>

            <div className="text-center">
                <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">
                    {friend.name}
                </h3>
                
                <p className="text-sm text-slate-400 font-medium mt-1">
                    {friend.days_since_contact}d ago
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {friend.tags.map((tag, i) => (
                        <span 
                            key={i} 
                            className="text-[11px] font-bold bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-4">
                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full inline-block ${getStatusStyles(friend.status)}`}>
                        {friend.status}
                    </span>
                </div>
            </div>
        </Link>
    ))}
</div>
        </div>
    );
};

export default Home;