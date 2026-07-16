import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "faire"
    | "voir"

export type ActiveSeeSectionFilter = "tous" | "presents" | "absents";

interface PresenceStore {
    activeSection: ActiveSection;
    setActiveSection: (page: ActiveSection) => void;
    searchInput: string;
    setSearchInput: (text: string) => void;
    voiceNumber: number;
    setVoiceNumber: (voiceNumber: number) => void;
    activeSeeSectionFilter: ActiveSeeSectionFilter;
    setActiveSeeSectionFilter: (seeSectionFilter: ActiveSeeSectionFilter) => void
}

export const usePresenceStore = create<PresenceStore>()(
    persist(
        (set) => ({
            activeSection: "faire",
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

            activeSeeSectionFilter: "tous",
            setActiveSeeSectionFilter: (value) => {
                set ({
                    activeSeeSectionFilter: value
                })
            }
        }),
        {
            name: "presence-store",
        }
    )
);