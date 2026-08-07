'use client';
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretDownIcon } from "@phosphor-icons/react"
import { useAttendanceStore } from "@/app/stores/attendance-store";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function VoicePickerComponent() {
    const { voiceNumber, setVoiceNumber, hasHydrated } = useAttendanceStore();
    const chosenVoice = hasHydrated
        ? (voices[voiceNumber] ?? voices[0])
        : voices[0];

    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    console.log("voiceNumber in VoicePickerComponent:", voiceNumber); // Debugging log
    return <>
        {!hasHydrated && <div className="w-fit p-2.5 justify-center text-gray-200 cursor-pointer h-full px-4 border-gray-200 border rounded flex items-center gap-1">
            <Skeleton className="w-10 h-4 rounded bg-gray-200" />
            <CaretDownIcon size={18} />
        </div>}
        {hasHydrated && <Popover
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
        >
            <PopoverTrigger>
                <span className="w-fit p-2.5 justify-center cursor-pointer h-full px-4 border-gray-200 border rounded flex items-center gap-1">
                    {chosenVoice.voiceAppellation}
                    <CaretDownIcon size={18} />
                </span>
            </PopoverTrigger>

            <PopoverContent align="start" className="p-0 rounded border-none">
                <div className="md:text-base flex flex-col gap-1 p-2">
                    {voices.map((voice) => (
                        <span
                            key={voice.voiceNumber}
                            className={`cursor-pointer rounded p-2.5 px-4 w-full ${voice.voiceNumber === chosenVoice.voiceNumber
                                ? "bg-gray-100 text-black"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                            onClick={() => {
                                setVoiceNumber(voice.voiceNumber)
                                setPopoverOpen(false);
                            }}
                        >
                            {voice.voiceAppellation}
                        </span>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
        }
    </>
}