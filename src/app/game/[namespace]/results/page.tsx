"use client"

import { motion } from 'framer-motion';
import { useCallback, useContext } from "react";
import countries from "@/assets/countries.json";

import CountryFlag from "@/components/ui/CountryFlag";
import PollLeaderboardResults from './PollLeaderboardResults';

import React from "react";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import ResultContext from '@/utils/ResultContext';

export default function ResultsPage() {
  const results = useContext(ResultContext)

  const particlesInit = useCallback(async (engine: any) => {
    // Load the confetti preset
    await loadConfettiPreset(engine);
  }, []);

  if (results == null) {
    return <p>Missing results</p>
  }

  return (
    <div className="min-h-svh flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8 text-white">
      <h1 className="text-white text-4xl font-semibold mb-4">Results</h1>

      <Particles
        id="confetti-particles"
        init={particlesInit}
        options={{
          preset: "confetti", // Use the confetti preset
          fullScreen: {
            enable: true,   // Makes the particles cover the entire screen
            zIndex: 1       // Adjusts layering; higher z-index puts particles above other elements
          },
          delay: 5
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='pb-8'
      >
        <h2 className="font-semibold text-gray-100">The Country of Origin was...</h2>
        <div className="flex items-center gap-x-2">
          <h3 className="text-white text-2xl font-semibold">{(countries as any)[results.country]}</h3>
          <CountryFlag alpha2={results.country} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 5 }}
        className='py-8 border-t'
      >
        <h2 className="font-semibold text-gray-100">and the Winning Team is...</h2>
        <div className="flex items-center gap-x-2">
          <h3  className="text-white text-2xl font-semibold">
            {results.winner === 0 ? "The Red Team" : results.winner === 1 ? "The Blue Team" : results.winner === -1 ? "Both Teams" : "Neither Team"}
          </h3>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 10 }}
        className="pt-8 border-t"
      >
        <div className="flex flex-col justify-start items-start relative">
          <h2 className="font-semibold text-gray-100">Red Team Votes</h2>
          <PollLeaderboardResults leaderboard={results.votes[0]} color={'red'} />
        </div>

        <div className='flex flex-col justify-start items-start relative'>
          <h2 className="font-semibold text-gray-100 mt-8">Blue Team Votes</h2>
          <PollLeaderboardResults leaderboard={results.votes[1]} color={'blue'} />
        </div>
      </motion.div>
    </div>
  );
}