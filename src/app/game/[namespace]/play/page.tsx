"use client";
import { useState } from "react";
import { useParams } from "next/navigation"
import Globe from "./Globe";
import { Country } from "@/types/country";
import { Radio } from "./Radio";
import CountryFlag from "./CountryFlag";
import PollLeaderboard from "./PollLeaderboard";
import { Countdown } from "./Countdown";

function GamePage() {
    const router = useParams();
    const { namespace } = router;

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [leaderboard, setLeaderboard] = useState<Record<string, number>>({
        'US': 10,
        'CA': 8,
        'MX': 6,
        'BR': 2,
    });

    return (
        <div className="flex flex-col overflow-y-hidden h-[100vh] relative">
            <div>
                <CountryFlag alpha2={selectedCountry?.alpha2} />
                <PollLeaderboard leaderboard={leaderboard} alpha2={selectedCountry?.alpha2} />
            </div>
            <Globe onSelectCountry={setSelectedCountry} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-x-2 relative">
                    <div className="flex-1 h-fit my-auto">
                        <Radio urls={["https://radio.garden/api/ara/content/listen/FhL85inn/channel.mp3"]} />
                    </div>
                    <Countdown duration={100} />
                </div>
            </div>
        </div>
    )
}

export default GamePage
