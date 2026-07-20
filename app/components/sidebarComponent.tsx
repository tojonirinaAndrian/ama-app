"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  UserListIcon,
  CallBellIcon,
  SignOutIcon,
  InfoIcon,
  ListIcon,
  XIcon,
  GraphIcon
} from "@phosphor-icons/react";

import { Icon } from "@phosphor-icons/react";

import { useSidebarStore } from "@/app/stores/sidebar-store";

import Link from "next/link";

// type ActivePage = "home" | "list" | "attendance" | "about";

const ACTIVE_STYLE = "bg-gray-100 !text-black";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        key: "home",
        label: "Home",
        icon: HouseIcon,
        href: "/home"
      },

      {
        key: "list",
        label: "List of members",
        icon: UserListIcon,
        href: "/list"
      },

      {
        key: "attendance",
        label: "Attendance",
        icon: CallBellIcon,
        href: "/attendance"
      },

      {
        key: "stats",
        label: "Stats",
        icon: GraphIcon,
        href: "/stats"
      },
    ],
  },
  {
    title: "GENERAL",
    items: [
      {
        key: "about",
        label: "About",
        icon: InfoIcon,
        href: "/about"
      },

    ],
  },
] as const;

interface NavItemProps {
  active: boolean;
  label: string;
  icon: Icon;
  onClick: () => void;
  href: string;
}

function NavItem({ active, label, icon: Icon, onClick, href }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-sm p-3 py-2.5 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-black ${active ? ACTIVE_STYLE : ""
        }`}
    >
      <Icon size={22} />
      <span>{label}</span>
    </Link>
  );
}

export default function SidebarComponent() {
  const pathname = usePathname();
  const { activePage, setActivePage, menuOpen, toggleMenu, closeMenu } = useSidebarStore();

  useEffect(() => {
    // Map pathname to menu item key
    const pathToPageMap: Record<string, "home" | "list" | "attendance" | "about" | "stats"> = {
      "/home": "home",
      "/list": "list",
      "/attendance": "attendance",
      "/about": "about",
      "/stats": "stats"
    };

    const page = pathToPageMap[pathname];
    if (page) {
      setActivePage(page);
    }
  }, [pathname, setActivePage]);

  const menu = (
    <>
      <div className="hidden xl:flex items-center gap-3 text-xl">
        <div className="rounded-sm bg-blue-200 p-2">[LOGO]</div>
        <h2 className="font-bold">AMA</h2>
      </div>

      {menuItems.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <p className="text-xs text-gray-700">{section.title}</p>

          <ul className="flex flex-col gap-1">
            {section.items.map((item) => (
              <NavItem
                active={activePage === item.key}
                label={item.label}
                icon={item.icon}
                onClick={() => setActivePage(item.key)}
                href={item.href}
                key={item.key}
              />
            ))}

            {section.title === "GENERAL" && (
              <li className="flex cursor-pointer items-center gap-2 rounded-sm p-3 py-2.5 text-red-500 hover:bg-red-100">
                <SignOutIcon size={22} />
                <span>Sign out</span>
              </li>
            )}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <>
      <aside className="hidden h-dvh min-w-70 w-[20%] flex-col gap-7 border-r border-gray-100 bg-gray-50/20 p-5 xl:flex">
        {menu}
      </aside>

      <div className="relative flex w-full flex-col xl:hidden z-5">
        <button
          className="border-b border-gray-100 p-5 bg-white"
        >
          <div className="flex items-center gap-2 w-fit"
            onClick={toggleMenu}>
            {menuOpen ? (
              <XIcon size={22} weight="bold" />
            ) : (
              <ListIcon size={22} weight="bold" />
            )}

            <span className="text-xl font-bold">Menu</span>
          </div>

        </button>

        {menuOpen && (
          <div className="flex flex-col gap-7 bg-white p-5 absolute w-full top-full">{menu}</div>
        )}
      </div>

      {menuOpen && (
        <div
          onClick={closeMenu}
          className="absolute inset-0 z-1 h-dvh bg-black/50 backdrop-blur-sm"
        />
      )}
    </>
  );
}
