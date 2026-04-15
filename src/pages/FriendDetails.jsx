import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, VideoCameraIcon, ArchiveBoxIcon, BellSnoozeIcon, TrashIcon } from "@heroicons/react/24/outline";

const FriendDetails = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        setFriend(found);
      });
  }, [id]);

  const handleCheckIn = (type) => {
    if (!friend) return;
    const newEntry = {
      id: Date.now(),
      friendId: friend.id,
      friendName: friend.name,
      type: type,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: `${type} with ${friend.name}`
    };

    const existingTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    localStorage.setItem("timeline", JSON.stringify([newEntry, ...existingTimeline]));
    toast.success(`${type} logged for ${friend.name}!`);
  };

  if (!friend) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center shadow-sm">
            <img src={friend.picture} className="w-24 h-24 rounded-full mx-auto object-cover grayscale-[0.2]" alt={friend.name} />
            <h2 className="text-2xl font-bold mt-4 text-slate-800">{friend.name}</h2>
            
            <div className="flex flex-col items-center gap-2 mt-3">
              <span className="px-4 py-1 bg-[#EF4444] text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                {friend.status}
              </span>
              <span className="px-4 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full text-[10px] font-black uppercase tracking-wider">
                Family
              </span>
            </div>

            <p className="mt-6 text-slate-500 italic text-sm font-medium leading-relaxed px-4">
              "{friend.bio || "Former colleague, great mentor"}"
            </p>
            <p className="mt-4 text-slate-400 text-xs">
              Preferred: <span className="font-semibold">{friend.preferred_method || "email"}</span>
            </p>
          </div>


          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col divide-y divide-gray-50">
            <button className="py-4 px-6 flex items-center justify-center gap-3 hover:bg-gray-50 text-slate-700 font-bold text-sm transition group">
              <BellSnoozeIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Snooze 2 Weeks
            </button>
            <button className="py-4 px-6 flex items-center justify-center gap-3 hover:bg-gray-50 text-slate-700 font-bold text-sm transition group">
              <ArchiveBoxIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Archive
            </button>
            <button className="py-4 px-6 flex items-center justify-center gap-3 hover:bg-red-50 text-[#EF4444] font-bold text-sm transition group">
              <TrashIcon className="w-5 h-5 text-[#EF4444]/60 group-hover:text-[#EF4444]" /> Delete
            </button>
          </div>
        </div>


        <div className="lg:col-span-8 flex flex-col gap-6">
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-3xl font-black text-[#244D3F] mb-1">{friend.days_since_contact}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">Days Since Contact</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-3xl font-black text-[#244D3F] mb-1">{friend.goal}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">Goal (Days)</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-2xl font-black text-[#244D3F] mb-1">{friend.next_due_date || "Feb 27, 2026"}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">Next Due</p>
            </div>
          </div>


          <div className="bg-white p-8 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-[#244D3F] text-lg">Relationship Goal</h3>
              <p className="text-slate-500 text-sm mt-1">Connect every <span className="font-black text-slate-800">{friend.goal} days</span></p>
            </div>
            <button className="px-4 py-2 bg-gray-50 border border-gray-100 text-slate-700 rounded-md hover:bg-gray-100 text-sm font-bold transition">
              Edit
            </button>
          </div>


          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#244D3F] mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleCheckIn("Call")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition group">
                <PhoneIcon className="w-8 h-8 text-slate-800 group-hover:scale-110 transition" />
                <span className="text-sm font-bold text-slate-700">Call</span>
              </button>
              <button onClick={() => handleCheckIn("Text")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition group">
                <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-slate-800 group-hover:scale-110 transition" />
                <span className="text-sm font-bold text-slate-700">Text</span>
              </button>
              <button onClick={() => handleCheckIn("Video")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition group">
                <VideoCameraIcon className="w-8 h-8 text-slate-800 group-hover:scale-110 transition" />
                <span className="text-sm font-bold text-slate-700">Video</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FriendDetails;