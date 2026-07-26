import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "mark"
    | "view"

export type ActiveSeeSectionFilter = "all" | "present" | "absent";

  // const [actualDateMark, setActualDateMark] = useState<Date>(new Date());

interface StatsStore {
    searchInput: string;
    setSearchInput: (text: string) => void;
    voiceNumber: number;
    setVoiceNumber: (voiceNumber: number) => void;
}

export const useStatsStore = create<StatsStore>()(
    persist(
        (set) => ({
            searchInput: "",
            setSearchInput: (text) => {
                set({
                    searchInput: text
                })
            },

            voiceNumber: 0,
            setVoiceNumber: (num) => {
                set({
                    voiceNumber: num
                })
            },
        }),
        {
            name: "Stats-store",
        }
    )
);