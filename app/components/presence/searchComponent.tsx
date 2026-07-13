'use client';
import { MagnifyingGlassIcon, BackspaceIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function SearchComponent() {
    const [isInputting, setIsInputting] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    useEffect(() => {
        const searchElement = document.getElementById("searchInput");
        searchElement?.addEventListener("focusin", () => {
            setIsInputting(true)
        });
        searchElement?.addEventListener("focusout", () => {
            setIsInputting(false)
        });
        window.addEventListener("keypress", (e) => {
            // console.log(e.coe)
            if (e.code === "KeyK" && e.ctrlKey) {
                e.preventDefault();
                console.log(e.code);
            }}
        )
    }, []);
    const onCancelClick = () => {
        const searchElement: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
        searchElement.value = "";
        searchElement.focus();
        setUserInput("");
    };
    return <>
        <div className="p-5 flex flex-col">
            <div
                className={`xl:w-[45%] md:w-[60%] relative border flex gap-1 p-1 items-center rounded border-gray-200 bg-gray-50 ${isInputting && "outline outline-gray-500 bg-white"}`}>

                <div className="p-2.5 pr-1 cursor-text"
                    onClick={() => {
                        const searchElement: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
                        searchElement.focus();
                    }}
                >
                    <MagnifyingGlassIcon className="text-gray-500" size={24} />
                </div>
                <input type="text" className={`z-1 h-full w-full focus:outline-none ${!isInputting ? "text-gray-800" : "text-black"}`}
                    id="searchInput"
                    placeholder="Rechercher un membre..."
                    onChange={(e) => {
                        setUserInput(e.target.value)
                    }}
                />
                {(userInput.length >= 1) ? <button
                    onClick={onCancelClick}
                    className="cursor-pointer w-fit flex gap-2 px-3 items-center bg-white border rounded p-2 border-gray-300">
                    <BackspaceIcon size={18} />
                    <span className="">
                        Annuler
                    </span>
                </button> : (!isInputting) && <span className="absolute right-4 text-gray-400">
                    ctrl+K
                </span>}
            </div>
            <p>{userInput}</p>
        </div>
    </>
}