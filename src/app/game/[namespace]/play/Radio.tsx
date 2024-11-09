import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"


import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

export interface RadioProps {
    urls: string[];
    start: number
}

export const Radio: React.FC<RadioProps> = ({ urls, start }) => {
    const [urlIndex, setUrlIndex] = useState(start);
    const [volume, setVolume] = useState(1);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [audioRef]);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [audioRef]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <div className="flex flex-col md:flex-row gap-x-2 gap-y-4 md:items-center bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-500 w-full items-center">
            <div className="flex gap-x-2 items-center">
                {isPlaying ? (
                    <Button onClick={pause}>
                        <FaPause />
                    </Button> ) : (
                    <Button onClick={play}>
                        <FaPlay />
                    </Button>
                )}
                <Button onClick={() => setUrlIndex((urlIndex - 1 + urls.length) % urls.length)}>
                    <FaChevronLeft />
                </Button>
                <Button onClick={() => setUrlIndex((urlIndex + 1) % urls.length)}>
                    <FaChevronRight />
                </Button>
            </div>
            <Slider
                value={[volume]}
                onValueChange={(values) => setVolume(values[0])}
                min={0}
                max={1}
                step={0.01}
                className="flex-grow"
            />
            <audio ref={audioRef} controls autoPlay className="hidden" src={urls[urlIndex]}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};
