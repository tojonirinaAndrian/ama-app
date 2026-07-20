import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "mark"
    | "view"

export type ActiveSeeSectionFilter = "all" | "present" | "absent";

  // const [actualDateMark, setActualDateMark] = useState<Date>(new Date());

interface AttendanceStore {
    activeSection: ActiveSection;
    setActiveSection: (page: ActiveSection) => void;
    searchInput: string;
    setSearchInput: (text: string) => void;
    voiceNumber: number;
    setVoiceNumber: (voiceNumber: number) => void;
    activeSeeSectionFilter: ActiveSeeSectionFilter;
    setActiveSeeSectionFilter: (seeSectionFilter: ActiveSeeSectionFilter) => void;

    actualDateMark: Date;
    actualDateView: Date;

    setActualDateMark: (newDate: Date) => void;
    setActualDateView: (newDate: Date) => void;
}

export const useAttendanceStore = create<AttendanceStore>()(
    persist(
        (set) => ({
            activeSection: "mark",
            setActiveSection: (section) => {
                set({
                    activeSection: section,
                })
            },

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

            activeSeeSectionFilter: "all",
            setActiveSeeSectionFilter: (value) => {
                set ({
                    activeSeeSectionFilter: value
                })
            },

            actualDateMark: new Date(),

            actualDateView: new Date(),

            setActualDateMark: (value) => {
                set ({
                    actualDateMark: value
                })
            },
            setActualDateView: (value) => {
                set ({
                    actualDateView: value
                })
            }
        }),
        {
            name: "attendance-store",
        }
    )
);