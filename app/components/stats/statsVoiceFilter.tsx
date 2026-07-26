'use client';
import { useState } from "react";
import { useStatsStore } from "@/app/stores/stats-store";

type VoiceType = {
    voiceNumber: number,
    voiceAppellation: string
};

const voices: VoiceType[] = [{
    voiceNumber: 0,
    voiceAppellation: "All voices"
}, {
    voiceNumber: 1,
    voiceAppellation: "Soprano"
}, {
    voiceNumber: 2,
    voiceAppellation: "Alto"
}, {
    voiceNumber: 3,
    voiceAppellation: "Tenor"
}, {
    voiceNumber: 4,
    voiceAppellation: "Bass"
}, {
    voiceNumber: 5,
    voiceAppellation: "Musician"
}];

type voiceStatsType = { 
    voiceNumber: number, 
    value: number 
}[];

export default function StatsVoiceFilter({ props }: { props: voiceStatsType }) {
    const { voiceNumber, setVoiceNumber } = useStatsStore();
    const [chosenVoice, setChosenVoice] = useState<VoiceType>(voices[voiceNumber]);

    return <>
        <div className="inline-block space-x-1 space-y-1">
            {voices.map((voice) => (
                <button
                    key={voice.voiceNumber}
                    className={`cursor-pointer border rounded pr-2 p-2 px-3 ${voice.voiceNumber === chosenVoice.voiceNumber
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "text-gray-500 hover:bg-blue-50 hover:text-blue-800 border-blue-50"
                        }`}
                    onClick={() => {
                        setChosenVoice(voice);
                        setVoiceNumber(voice.voiceNumber)
                    }}
                >
                    {voice.voiceAppellation} - <span className="bg-gray-50 p-1 rounded-md">
                        {props[voice.voiceNumber].value}%
                    </span>
                </button>
            ))}
        </div>
    </>
}