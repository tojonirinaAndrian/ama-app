'use client';
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function SearchComponent() {
    const [isInputting, setIsInputting] = useState<boolean>(false);
    useEffect (() => {
        const searchElement = document.getElementById("searchInput");
        searchElement?.addEventListener("focusin", () => {
            setIsInputting(true)
        });
        searchElement?.addEventListener("focusout", () => {
            setIsInputting(false)
        });
    }, [])
    return <>
        <div className="p-3 flex flex-col">
            <div 
            className={`border flex gap-2 items-center p-3 rounded border-gray-200 bg-gray-50 ${isInputting && "outline outline-gray-500 bg-white"}`}>
                <MagnifyingGlassIcon className="text-gray-500"/>
                <input type="text" className="w-full focus:outline-none"
                    id="searchInput"
                    placeholder="Rechercher un membre..."
                    // onKeyUp={(e) => {
                    //     console.log(e.detail)
                    // }}
                />
            </div>
        </div>
    </>
}