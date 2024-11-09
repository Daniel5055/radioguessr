import countries from '@/assets/countries.json';
import { Progress } from '@/components/ui/progress';

export interface PollLeaderboardProps {
    leaderboard: Record<string, number>;
    alpha2?: string;
}

function PollLeaderboard({ leaderboard, alpha2 }: PollLeaderboardProps) {
    const maxVotes = Math.max(...Object.values(leaderboard));
    return (
        <div className="absolute p-4 top-0 right-0">
            <div className="flex flex-col max-w-48">
                {Object.entries(leaderboard).sort((a, b) => {
                    return b[1] - a[1];
                }).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-x-2 text-white">
                        <span className={`flex-1 truncate ${alpha2 === key ? "text-indigo-500" : ""}`}>{(countries as any)[key]}</span>
                        <span className="w-24">
                            <Progress value={value / maxVotes * 100} />
                        </span>
                        <span className="flex justify-end w-5">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PollLeaderboard;
