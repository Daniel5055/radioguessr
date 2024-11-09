import { useEffect, useState } from "react";

export interface CountdownProps {
    duration: number;
    onEnd?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ duration, onEnd }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => {
                if (time <= 0) {
                    clearInterval(interval);
                    onEnd?.();
                    return 0;
                }
                return time - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [onEnd]);

    return <div className="flex items-center justify-center bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-500 text-white w-8">{time}</div>;
};
