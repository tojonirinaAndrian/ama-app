import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSection =
    | "faire"
    | "voir"

interface PresenceStore {
    activeSection: ActiveSection;
    setActiveSection: (page: ActiveSection) => void;

}

export const usePresenceStore = create<PresenceStore>()(
    persist(
        (set) => ({
            activeSection: "faire",

            setActiveSection: (section) =>
                set({
                    activeSection: section,
                }),
        }),
        {
            name: "presence-store",
        }
    )
);