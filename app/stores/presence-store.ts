import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "faire"
    | "voir"

interface PresenceStore {
    activeSection: ActiveSection;
    setActiveSection: (page: ActiveSection) => void;
    searchInput: string;
    setSearchInput: (text: string) => void;
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
            }
        }),
        
        {
            name: "presence-store",
        }
    )
);