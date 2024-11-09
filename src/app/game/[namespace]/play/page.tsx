"use client";
import { useState } from "react";
import { useParams } from "next/navigation"
import Globe from "./Globe";
import { Country } from "@/types/country";

function GamePage() {
    const router = useParams();
    const { namespace } = router;

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    return (
        <div className="flex flex-col overflow-y-hidden h-[100vh]">
            <h1>country: {selectedCountry?.name}</h1>
            <p>Namespace: {namespace}</p>
            <Globe onSelectCountry={setSelectedCountry} />
        </div>
    )
}

export default GamePage
