import { useState, useEffect } from "react";
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, VideoCameraIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Timeline = () => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Noob way: Look at a global window variable instead of storage
    if (window.myGlobalTimeline) {
      setEntries(window.myGlobalTimeline);
    } else {
      setEntries([]);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-[40px] font-black text-slate-900 mb-6">Timeline</h1>
        <div className="relative w-full max-w-xs">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-100 rounded-md px-4 py-3 text-slate-400 text-sm cursor-pointer shadow-sm"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Calls</option>
            <option value="Text">Texts</option>
            <option value="Video">Videos</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-slate-300" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => {
            if (filter !== "All" && entry.type !== filter) {
              return null;
            }
            return (
              <div key={entry.id} className="bg-white p-6 border border-blue-100/50 flex items-center gap-6 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {entry.type === "Call" && <PhoneIcon className="w-6 h-6 text-slate-600" />}
                  {entry.type === "Text" && <div className="text-2xl">💬</div>}
                  {entry.type === "Video" && <div className="text-2xl">📽️</div>}
                  {entry.type === "Meetup" && <div className="text-2xl">🤝</div>}
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-lg text-slate-800">{entry.type}</span>
                    <span className="text-slate-400 text-sm font-medium">with {entry.friendName}</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium mt-0.5">{entry.date}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-slate-400 font-medium">No interactions found. Refreshing the page cleared them!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;