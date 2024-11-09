import countries from '@/assets/countries.json';
import { Progress } from '@/components/ui/progress';

export interface PollLeaderboardResultsProps {
    leaderboard: Record<string, number>;
    alpha2?: string;
    color?: string;
}

function PollLeaderboardResults({ leaderboard, color, alpha2 }: PollLeaderboardResultsProps) {
    const maxVotes = Math.max(...Object.values(leaderboard));

    return (
        <div className="flex flex-col items-end">
            {(Object.entries(leaderboard).length > 0) && (
                <div className="flex flex-col space-y-1">
                    {Object.entries(leaderboard).sort((a, b) => {
                        return b[1] - a[1];
                    }).map(([key, value]) => {
                        return (
                            <div key={key} className="flex items-center gap-x-2 text-white p-1 w-full">
                                <span className={`flex-1 truncate ${alpha2 === key ? "text-indigo-500 font-bold" : ""}`}>{(countries as any)[key]}</span>
                                <span className="w-1/3 min-w-24">
                                    <Progress value={value / maxVotes * 100} color={color} />
                                </span>
                                <span className="flex justify-end w-5">{value}</span>
                            </div>
                        );
                    })}
                </div>
            )}
            
        </div>
    );
}

export default PollLeaderboardResults;
