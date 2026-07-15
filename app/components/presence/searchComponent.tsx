'use client';
import { usePresenceStore } from "@/app/stores/presence-store";
import { MagnifyingGlassIcon, BackspaceIcon } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";

export default function SearchComponent() {
    const [isInputting, setIsInputting] = useState<boolean>(false);
    // const [searchInput, setSearchInput] = useState<string>("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { searchInput, setSearchInput } = usePresenceStore();

    useEffect(() => {
        const searchElement = document.getElementById("searchInput");
        searchElement?.addEventListener("focusin", () => {
            setIsInputting(true)
        });
        searchElement?.addEventListener("focusout", () => {
            setIsInputting(false)
        });

        //TODO: add ctrl+k search feature
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl + K (Windows/Linux) or Cmd + K (Mac)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault(); // Prevent browser search/address bar behavior
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    
    
    const onCancelClick = () => {
        const searchElement: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
        searchElement.value = "";
        searchElement.focus();
        setSearchInput("");
    };


    return <>
        <div
            className={`w-full xl:w-[45%] md:w-[60%] relative border flex gap-1 p-1 items-center rounded border-gray-200 bg-gray-50 ${isInputting && "outline outline-gray-500 bg-white"}`}>

            <div className="p-1.5 pr-1 cursor-text"
                onClick={() => {
                    searchInputRef.current?.focus();
                }}
            >
                <MagnifyingGlassIcon className="text-gray-500" size={24} />
            </div>
            <input type="text" className={`z-1 h-full w-full focus:outline-none ${!isInputting ? "text-gray-800" : "text-black"}`}
                id="searchInput"
                ref={searchInputRef}
                placeholder="Rechercher un membre..."
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }}
            />
            {(searchInput.length >= 1) ? <button
                onClick={onCancelClick}
                className="cursor-pointer w-fit flex gap-2 px-3 items-center bg-white border rounded p-2 border-gray-300">
                <BackspaceIcon size={18} />
                <span className="">
                    Annuler
                </span>
            </button> : (!isInputting) && <span className="not-md:hidden absolute right-4 text-gray-400">
                ctrl+K
            </span>}
        </div>
    </>
}