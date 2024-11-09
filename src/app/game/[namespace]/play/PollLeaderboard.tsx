import { useState } from 'react';
import countries from '@/assets/countries.json';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface PollLeaderboardProps {
    leaderboard: Record<string, number>;
    alpha2?: string;
}

function PollLeaderboard({ leaderboard, alpha2 }: PollLeaderboardProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const maxVotes = Math.max(...Object.values(leaderboard));

    return (
        <div className="absolute top-0 right-0 flex flex-col items-end">
            {!isCollapsed && (
                <div className='p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg'>
                    <div className="flex flex-col max-w-48 space-y-1">
                        {Object.entries(leaderboard).sort((a, b) => {
                            return b[1] - a[1];
                        }).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-x-2 text-white p-1 bg-gray-900 rounded-md">
                                <span className={`flex-1 truncate ${alpha2 === key ? "text-indigo-500 font-bold" : ""}`}>{(countries as any)[key]}</span>
                                <span className="w-20">
                                    <Progress value={value / maxVotes * 100} />
                                </span>
                                <span className="flex justify-end w-5">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn("text-white bg-gray-700 p-1 rounded-md mb-2 w-fit flex items-center gap-x-1", isCollapsed ? "mt-5" : "flex-row")}
            >
                {isCollapsed ? (
                    <>
                        <span>Show Leaderboard</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </>
                )}
            </button>
            
        </div>
    );
}

export default PollLeaderboard;
