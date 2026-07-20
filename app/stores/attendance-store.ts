import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "mark"
    | "view"

export type ActiveSeeSectionFilter = "all" | "present" | "absent";

interface AttendanceStore {
    activeSection: ActiveSection;
    setActiveSection: (page: ActiveSection) => void;
    searchInput: string;
    setSearchInput: (text: string) => void;
    voiceNumber: number;
    setVoiceNumber: (voiceNumber: number) => void;
    activeSeeSectionFilter: ActiveSeeSectionFilter;
    setActiveSeeSectionFilter: (seeSectionFilter: ActiveSeeSectionFilter) => void
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
            }
        }),
        {
            name: "attendance-store",
        }
    )
);