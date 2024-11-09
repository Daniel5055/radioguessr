"use client";
import { useState } from "react";
import { useParams } from "next/navigation"
import Globe from "./Globe";
import { Country } from "@/types/country";
import { Radio } from "./Radio";
import CountryFlag from "./CountryFlag";
import PollLeaderboard from "./PollLeaderboard";

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
            <CountryFlag alpha2={selectedCountry?.alpha2} />
            <PollLeaderboard leaderboard={leaderboard} alpha2={selectedCountry?.alpha2} />
            <Globe onSelectCountry={setSelectedCountry} />
            <Radio urls={["https://radio.garden/api/ara/content/listen/FhL85inn/channel.mp3"]} />
        </div>
    )
}

export default GamePage
