"use client";
import { useState } from "react";
import { useParams } from "next/navigation"
import Globe from "./Globe";
import { Country } from "@/types/country";
import { Radio } from "./Radio";

function GamePage() {
    const router = useParams();
    const { namespace } = router;

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    return (
        <div className="flex flex-col overflow-y-hidden h-[100vh] relative">
            <h1>country: {selectedCountry?.name}</h1>
            <p>Namespace: {namespace}</p>
            <Globe onSelectCountry={setSelectedCountry} />
            <Radio urls={["https://radio.garden/api/ara/content/listen/FhL85inn/channel.mp3"]} />
        </div>
    )
}

export default GamePage
