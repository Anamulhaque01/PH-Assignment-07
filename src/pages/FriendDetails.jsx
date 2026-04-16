import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, VideoCameraIcon, ArchiveBoxIcon, BellSnoozeIcon, TrashIcon } from "@heroicons/react/24/outline";

const FriendDetails = () => {
  const params = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        for(let i = 0; i < data.length; i++) {
          if(data[i].id == params.id) {
            setFriend(data[i]);
          }
        }
      });
  }, [params.id]);

  const handleCheckIn = (type) => {
    // Noob way: Check if global array exists, if not make it
    if (!window.myGlobalTimeline) {
      window.myGlobalTimeline = [];
    }
    
    const newInteraction = {
      id: Math.random(), 
      friendName: friend.name,
      type: type,
      date: new Date().toLocaleDateString('en-GB')
    };

    // Push directly to the global window object (will vanish on refresh)
    window.myGlobalTimeline = [newInteraction, ...window.myGlobalTimeline];
    
    toast.success(type + " logged for " + friend.name);
  };

  if (friend == null) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center shadow-sm">
            <img src={friend.picture} className="w-24 h-24 rounded-full mx-auto object-cover" alt="pfp" />
            <h2 className="text-2xl font-bold mt-4 text-slate-800">{friend.name}</h2>
            <div className="flex flex-col items-center gap-2 mt-3">
              <span className="px-4 py-1 bg-[#EF4444] text-white rounded-full text-[10px] font-black uppercase">{friend.status}</span>
            </div>
            <p className="mt-6 text-slate-500 italic text-sm">"{friend.bio}"</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col divide-y divide-gray-50">
            <button onClick={() => toast("Snoozed!")} className="py-4 px-6 flex items-center justify-center gap-3 hover:bg-gray-50 text-slate-700 font-bold text-sm">
              <BellSnoozeIcon className="w-5 h-5 text-slate-400" /> Snooze 2 Weeks
            </button>
            <button onClick={() => toast.error("Deleted!")} className="py-4 px-6 flex items-center justify-center gap-3 hover:bg-red-50 text-[#EF4444] font-bold text-sm">
              <TrashIcon className="w-5 h-5" /> Delete
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-3xl font-black text-[#244D3F] mb-1">{friend.days_since_contact}</p>
              <p className="text-slate-400 text-xs font-bold uppercase">Days Since</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-3xl font-black text-[#244D3F] mb-1">{friend.goal}</p>
              <p className="text-slate-400 text-xs font-bold uppercase">Goal</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-2xl font-black text-[#244D3F] mb-1">Apr 20</p>
              <p className="text-slate-400 text-xs font-bold uppercase">Next Due</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#244D3F] mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleCheckIn("Call")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition">
                <PhoneIcon className="w-8 h-8 text-slate-800" />
                <span className="text-sm font-bold text-slate-700">Call</span>
              </button>
              <button onClick={() => handleCheckIn("Text")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition">
                <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-slate-800" />
                <span className="text-sm font-bold text-slate-700">Text</span>
              </button>
              <button onClick={() => handleCheckIn("Video")} className="bg-gray-50/50 hover:bg-gray-100 border border-gray-100 p-6 rounded-xl flex flex-col items-center gap-4 transition">
                <VideoCameraIcon className="w-8 h-8 text-slate-800" />
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