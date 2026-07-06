import { create } from "zustand";

export type ActivePage =
  | "accueil"
  | "liste"
  | "presence"
  | "a-propos";

interface SidebarStore {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activePage: "accueil",

  setActivePage: (page) =>
    set({ activePage: page }),

  menuOpen: false,

  toggleMenu: () =>
    set((state) => ({
      menuOpen: !state.menuOpen,
    })),

  closeMenu: () =>
    set({ menuOpen: false }),
}));