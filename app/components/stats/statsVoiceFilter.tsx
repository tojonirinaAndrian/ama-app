'use client';
import { useState } from "react";
import { useStatsStore } from "@/app/stores/stats-store";
import { SlidersIcon } from "@phosphor-icons/react";

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

export default function StatsVoiceFilter() {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    return <>
        <button className="flex cursor-pointer items-center gap-2 p-2.5 px-4 border border-gray-200 rounded">
            <SlidersIcon size={18}/> Filters
        </button>
    </>
}